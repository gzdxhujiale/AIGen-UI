import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { streamChat, isCozeConfigured, type ChatMessage } from '@/api/coze'

import { useConfigStore } from './configStore'
import { useConfigPageStore } from './config_page_Store'
import { useAuthStore } from './authStore'
import type { PageConfigRecord, PageSubItem } from './config_page_Store'
import { fetchApi } from '@/api/request'
import { useNavigation } from '@/composables/useNavigation'
import { toast } from 'vue-sonner'

export interface AIMessage extends ChatMessage {
    id: string
    timestamp: Date
    status?: 'sending' | 'streaming' | 'complete' | 'error'
    type?: 'text' | 'config_preview'
    configData?: PageConfigRecord[]
}

export interface ChatSession {
    id: string
    title: string
    updated_at: string
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
    const pendingConfig = ref<unknown>(null)
    const streamingContent = ref('')
    const previewMode = ref<PreviewMode>(null)
    const isMinimized = ref(false)
    const changeSummary = ref<ChangeSummary | null>(null)
    const buttonPosition = ref({ x: window.innerWidth - 88, y: window.innerHeight - 144 })

    // --- Session State ---
    const sessions = ref<ChatSession[]>([])
    const currentSessionId = ref<string | null>(null)


    // 上下文模板: 用于控制发送给 AI 的额外上下文信息
    // 支持占位符 {{当前页面json配置}} 和 {{用户指令}}
    const contextTemplate = ref<string>('')

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
    function _normalizeAIConfig(config: unknown): PageConfigRecord[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- AI 返回的数据结构不可预测
        const wrap = (item: any): PageConfigRecord | null => {
            if (!item) return null

            // 清理 page_config 的助手函数
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
                const title = item.title || 'AI 生成页面'
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

        let rawList: any[]
        if (Array.isArray(config)) {
            rawList = config
        } else if (typeof config === 'object' && config !== null && 'items' in config && Array.isArray((config as any).items) && !('title' in config) && !('page_config' in config)) {
            // Treat as wrapper only if it doesn't look like a single record (no title/page_config)
            rawList = (config as any).items
        } else {
            rawList = [config]
        }
        return rawList.map(wrap).filter((r): r is PageConfigRecord => r !== null)
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
    // Session Management
    // ============================================

    async function loadSessions() {
        const authStore = useAuthStore()
        if (!authStore.user) return

        const { data, error } = await fetchApi('/ai/sessions').catch(e => ({ error: e, data: null }))

        if (error) {
            console.error('Failed to load sessions:', error)
            return
        }

        sessions.value = data || []
    }

    async function loadSessionMessages(sessionId: string) {
        isLoading.value = true
        try {
            const { data, error } = await fetchApi(`/ai/sessions/${sessionId}/messages`).catch(e => ({ error: e, data: null }))

            if (error) throw error

            messages.value = (data || []).map((m: any) => ({
                id: m.id,
                role: m.role as 'user' | 'assistant',
                content: m.content || '',
                timestamp: new Date(m.created_at),
                status: m.status as AIMessage['status'],
                configData: m.config_data
            }))
            currentSessionId.value = sessionId
        } catch (e: unknown) {
            console.error('Failed to load messages:', e)
            toast.error('加载历史消息失败')
        } finally {
            isLoading.value = false
        }
    }

    function createNewSession() {
        currentSessionId.value = null
        messages.value = []
        clearPreview()
    }

    async function deleteSession(sessionId: string) {
        const { error } = await fetchApi(`/ai/sessions/${sessionId}`, { method: 'DELETE' }).catch(e => ({ error: e }))
        if (error) {
            toast.error('删除失败')
            return
        }
        sessions.value = sessions.value.filter(s => s.id !== sessionId)
        if (currentSessionId.value === sessionId) {
            createNewSession()
        }
    }

    async function switchSession(sessionId: string) {
        if (currentSessionId.value === sessionId) return
        await loadSessionMessages(sessionId)
    }

    // ============================================
    // 上下文注入助手
    // ============================================

    function _getCurrentPageContext(): string | null {
        // 使用 useNavigation 组合式函数获取当前导航 ID
        // 注意：useNavigation 依赖于模块级 refs，所以在这里应该可以工作
        const { currentNavId } = useNavigation()
        const navId = currentNavId.value

        if (!navId) return null

        // 查找父级一级导航标题
        const title = configPageStore.findNavTitleBySubId(navId)
        if (!title) return null

        // 获取完整的一级页面配置记录
        const record = configPageStore.getPageConfigByTitle(title)
        if (!record || !record.page_config) return null

        // 序列化完整的 page_config (包含所有子页面项)
        try {
            // 目前发送完整配置以提供最完整的上下文
            return JSON.stringify(record.page_config, null, 2)
        } catch (e) {
            console.error('序列化页面上下文失败', e)
            return null
        }
    }

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
            // 1. Ensure Session Exists
            let sessionId = currentSessionId.value
            if (!sessionId) {
                const authStore = useAuthStore()
                if (authStore.user) {
                    // Create new session in DB
                    const title = content.slice(0, 30)
                    const { data, error } = await fetchApi('/ai/sessions', { method: 'POST', body: JSON.stringify({ title }) }).catch(e => ({ error: e, data: null }))

                    if (data && !error) {
                        sessionId = data.id
                        currentSessionId.value = sessionId
                        sessions.value.unshift(data) // Add to local list
                    }
                }
            }

            // 2. Persist User Message
            if (sessionId) {
                await fetchApi('/ai/messages', { method: 'POST', body: JSON.stringify({ session_id: sessionId, role: 'user', content: content.trim() }) }).catch(() => {})
            }

            // 构建发送给 API 的消息
            const messagesToSend = messages.value
                .filter(m => m.status === 'complete')
                .map(m => ({ role: m.role, content: m.content }))

            // 将上下文模板注入到最后一条用户消息中
            if (contextTemplate.value) {
                const lastIdx = messagesToSend.length - 1
                if (lastIdx >= 0 && messagesToSend[lastIdx].role === 'user') {
                    const originalInput = messagesToSend[lastIdx].content
                    let processedTemplate = contextTemplate.value

                    // 1. 处理页面配置占位符
                    if (processedTemplate.includes('{{当前页面json配置}}')) {
                        const context = _getCurrentPageContext()
                        if (context) {
                            processedTemplate = processedTemplate.replace('{{当前页面json配置}}', context)
                        } else {
                            processedTemplate = processedTemplate.replace('{{当前页面json配置}}', '{}')
                        }
                    }

                    // 2. 处理用户指令占位符
                    if (processedTemplate.includes('{{用户指令}}')) {
                        // 如果模板包含用户指令占位符，则替换占位符并覆盖原有消息
                        // 这允许模板完全控制消息结构
                        messagesToSend[lastIdx].content = processedTemplate.replace('{{用户指令}}', originalInput)
                    } else {
                        // 否则（兼容旧模式），将模板追加到用户消息后面
                        messagesToSend[lastIdx].content += processedTemplate
                    }
                }
            }

            await streamChat(
                messagesToSend,
                (chunk) => {
                    streamingContent.value += chunk
                    _updateLastMessage({ content: streamingContent.value })
                },
                async (full, config) => { // Make callback async
                    _updateLastMessage({ content: full, status: 'complete', type: config ? 'config_preview' : undefined, configData: config })
                    if (config) generatePreviewConfigs(config)
                    isLoading.value = false

                    // 3. Persist AI Message
                    if (sessionId) {
                        await fetchApi('/ai/messages', { method: 'POST', body: JSON.stringify({ session_id: sessionId, role: 'assistant', content: full, config_data: config, status: 'complete' }) }).catch(() => {})
                    }
                },
                (err) => {
                    _updateLastMessage({ content: `错误: ${err.message}`, status: 'error' })
                    isLoading.value = false
                    toast.error('AI 请求失败', { description: err.message })
                }
            )
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            _updateLastMessage({ content: `未预期错误: ${msg}`, status: 'error' })
            isLoading.value = false
        }
    }

    // ============================================
    // 预览与应用
    // ============================================

    function generatePreviewConfigs(config: unknown) {
        const records = _normalizeAIConfig(config)
        if (!records.length) return

        configPageStore.clearPreview()
        records.forEach(newRec => {
            const existing = configPageStore.getPageConfigByTitle(newRec.title)
            if (existing) {
                const merged = JSON.parse(JSON.stringify(existing))
                newRec.page_config.items?.forEach((ni: PageSubItem) => {
                    const idx = merged.page_config.items.findIndex((i: PageSubItem) => i.name === ni.name || i.id === ni.id)
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
            // 使用客户端 store 方法直接向 Supabase 应用更改
            // 这绕过了导致 400 错误的 'config-ops' Edge Function
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
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            console.error('应用预览失败:', e)
            toast.error('同步失败', { description: msg })
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
        previewMode, isMinimized, changeSummary, contextTemplate, sessions, currentSessionId,
        isConfigured, hasMessages, hasPendingConfig, hasPreviewConfig,
        toggleWindow, openWindow, closeWindow, sendMessage, clearMessages,
        minimizeWindow, generatePreviewConfigs, confirmPreview, cancelPreview, clearPreview, setButtonPosition,
        loadSessions, loadSessionMessages, createNewSession, deleteSession, switchSession
    }
})

