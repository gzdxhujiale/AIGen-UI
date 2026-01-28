import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { streamChat, isCozeConfigured, type ChatMessage } from '@/api/coze'

import { useConfigStore } from './configStore'
import { useConfigPageStore } from './config_page_Store'
import { toast } from 'vue-sonner'

export interface AIMessage extends ChatMessage {
    id: string
    timestamp: Date
    status?: 'sending' | 'streaming' | 'complete' | 'error'
    type?: 'text' | 'config_preview'
    configData?: any
}

export type PreviewMode = 'initial' | 'append' | null

export interface ChangeSummary {
    addedNavItems: number
    modifiedNavItems: number
    deletedNavItems: number
    addedPageConfigs: number
    modifiedPageConfigs: number
}

export const useAIStore = defineStore('ai', () => {
    const configPageStore = useConfigPageStore()
    const configStore = useConfigStore()

    // --- 状态 ---
    const messages = ref<AIMessage[]>([])
    const isOpen = ref(false)
    const isLoading = ref(false)
    const pendingConfig = ref<any>(null)
    const streamingContent = ref('')
    const previewMode = ref<PreviewMode>(null)
    const isMinimized = ref(false)
    const changeSummary = ref<ChangeSummary | null>(null)
    const buttonPosition = ref({ x: window.innerWidth - 88, y: window.innerHeight - 144 })

    // --- 计算属性 ---
    const isConfigured = computed(() => isCozeConfigured())
    const hasMessages = computed(() => messages.value.length > 0)
    const hasPendingConfig = computed(() => pendingConfig.value !== null)
    const hasPreviewConfig = computed(() => pendingConfig.value !== null)

    // ============================================
    // 内部助手
    // ============================================

    const _generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const _updateLastMessage = (updates: Partial<AIMessage>) => {
        const last = messages.value[messages.value.length - 1]
        if (last && last.role === 'assistant') Object.assign(last, updates)
    }

    /**
     * 标准化 AI 返回的异构配置数据
     */
    function _normalizeAIConfig(config: any): any[] {
        const wrap = (item: any) => {
            if (!item) return null

            // Helper to clean page_config
            const cleanPageConfig = (pc: any, defaultTitle: string) => ({
                title: pc.title || defaultTitle,
                icon: pc.icon || 'IconSettings',
                isOpen: pc.isOpen !== false, // default true
                visible: pc.visible !== false, // default true
                items: Array.isArray(pc.items) ? pc.items.map((sub: any) => ({
                    id: sub.id || sub.name || `node_${Math.random().toString(36).substr(2, 5)}`,
                    name: sub.name || '未命名',
                    component: sub.component
                })) : []
            })

            // 1. 已经是标准的 V9 记录格式 ({ title, page_config })
            if (item.title && item.page_config) {
                return {
                    title: item.title,
                    page_config: cleanPageConfig(item.page_config, item.title)
                }
            }

            // 2. 只有 items 的 PageContent 格式
            if (Array.isArray(item.items)) {
                const title = item.title || 'AI 生成导航'
                return {
                    title: title,
                    page_config: cleanPageConfig(item, title)
                }
            }

            // 3. 单个页面组件
            if (item.component) {
                const title = 'AI 生成页面'
                return {
                    title: title,
                    page_config: {
                        title: title,
                        icon: 'IconSettings',
                        isOpen: true,
                        visible: true,
                        items: [{
                            id: item.id || item.name || 'temp',
                            name: item.name || '新页面',
                            component: item.component
                        }]
                    }
                }
            }
            return null
        }

        const rawList = Array.isArray(config) ? config : (config.items && Array.isArray(config.items) ? config.items : [config])
        return rawList.map(wrap).filter(Boolean)
    }

    // ============================================
    // 窗口控制
    // ============================================

    const toggleWindow = () => { isOpen.value = !isOpen.value }
    const openWindow = () => { isOpen.value = true }
    const closeWindow = () => { isOpen.value = false }
    const minimizeWindow = () => { isMinimized.value = !isMinimized.value }
    const setButtonPosition = (x: number, y: number) => { buttonPosition.value = { x, y } }

    // ============================================
    // 聊天动作
    // ============================================

    async function sendMessage(content: string) {
        if (!content.trim() || isLoading.value) return

        messages.value.push({
            id: _generateId(), role: 'user', content: content.trim(),
            timestamp: new Date(), status: 'complete'
        })

        messages.value.push({
            id: _generateId(), role: 'assistant', content: '',
            timestamp: new Date(), status: 'streaming'
        })

        isLoading.value = true
        streamingContent.value = ''

        try {
            await streamChat(
                messages.value.filter(m => m.status === 'complete').map(m => ({ role: m.role, content: m.content })),
                (chunk) => {
                    streamingContent.value += chunk
                    _updateLastMessage({ content: streamingContent.value })
                },
                (full, config) => {
                    _updateLastMessage({ content: full, status: 'complete', type: config ? 'config_preview' : undefined, configData: config })
                    if (config) generatePreviewConfigs(config)
                    isLoading.value = false
                },
                (err) => {
                    _updateLastMessage({ content: `错误: ${err.message}`, status: 'error' })
                    isLoading.value = false
                    toast.error('AI 请求失败', { description: err.message })
                }
            )
        } catch (e: any) {
            _updateLastMessage({ content: `未预期错误: ${e.message}`, status: 'error' })
            isLoading.value = false
        }
    }

    // ============================================
    // 预览与应用
    // ============================================

    function generatePreviewConfigs(config: any) {
        const records = _normalizeAIConfig(config)
        if (!records.length) return

        configPageStore.clearPreview()
        records.forEach(newRec => {
            const existing = configPageStore.getPageConfigByTitle(newRec.title)
            if (existing) {
                const merged = JSON.parse(JSON.stringify(existing))
                newRec.page_config.items?.forEach((ni: any) => {
                    const idx = merged.page_config.items.findIndex((i: any) => i.name === ni.name || i.id === ni.id)
                    idx > -1 ? (merged.page_config.items[idx] = { ...merged.page_config.items[idx], ...ni }) : merged.page_config.items.push(ni)
                })
                configPageStore.setPreviewPageConfig(newRec.title, merged)
            } else {
                configPageStore.setPreviewPageConfig(newRec.title, newRec)
            }
        })

        previewMode.value = 'append'
        configStore.previewMode = 'append'
        pendingConfig.value = config
        changeSummary.value = {
            addedNavItems: records.filter(r => !configPageStore.getPageConfigByTitle(r.title)).length,
            modifiedNavItems: records.filter(r => configPageStore.getPageConfigByTitle(r.title)).length,
            deletedNavItems: 0, addedPageConfigs: 0, modifiedPageConfigs: 0
        }
    }

    async function confirmPreview() {
        if (!pendingConfig.value) return
        isLoading.value = true
        try {
            // Use the client-side store method to apply changes directly to Supabase
            // This bypasses the 'config-ops' Edge Function which was causing 400 errors
            const result = await configPageStore.applyPreview()

            if (result.success) {
                messages.value.push({
                    id: _generateId(), role: 'assistant', timestamp: new Date(), status: 'complete',
                    content: `✅ 配置已成功应用！`
                })
                toast.success('配置已更新')
                // No need to call clearPreview here as applyPreview likely handles cleanup or we follow standard flow
                clearPreview()
            } else {
                throw new Error(result.message || 'Unknown error during save')
            }
        } catch (e: any) {
            console.error('Failed to apply preview:', e)
            toast.error('同步失败', { description: e.message })
        } finally {
            isLoading.value = false
        }
    }

    const cancelPreview = () => {
        clearPreview()
        messages.value.push({ id: _generateId(), role: 'assistant', content: '已取消预览。', timestamp: new Date(), status: 'complete' })
    }

    const clearPreview = () => {
        pendingConfig.value = null
        previewMode.value = null
        changeSummary.value = null
        configPageStore.clearPreview()
        configStore.previewMode = null
    }

    const clearMessages = () => {
        messages.value = []
        pendingConfig.value = null
        streamingContent.value = ''
        clearPreview()
    }

    return {
        messages, isOpen, isLoading, pendingConfig, streamingContent, buttonPosition,
        previewMode, isMinimized, changeSummary,
        isConfigured, hasMessages, hasPendingConfig, hasPreviewConfig,
        toggleWindow, openWindow, closeWindow, sendMessage, clearMessages,
        minimizeWindow, generatePreviewConfigs, confirmPreview, cancelPreview, clearPreview, setButtonPosition
    }
})

