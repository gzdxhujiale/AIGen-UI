import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { streamChat, isCozeConfigured, type ChatMessage } from '@/api/coze'
import { supabase } from '@/api/supabase' // Added supabase import
import { useConfigStore } from './configStore'
import { useConfigPageStore } from './config_page_Store'
import { toast } from 'vue-sonner'

export interface AIMessage extends ChatMessage {
    id: string
    timestamp: Date
    status?: 'sending' | 'streaming' | 'complete' | 'error'
}

// 预览模式类型: initial = 当前配置, append = 追加 (移除了 override)
export type PreviewMode = 'initial' | 'append' | null

// 变更摘要类型
export interface ChangeSummary {
    addedNavItems: number
    modifiedNavItems: number
    deletedNavItems: number
    addedPageConfigs: number
    modifiedPageConfigs: number
}

export const useAIStore = defineStore('ai', () => {
    // 状态 (State)
    const messages = ref<AIMessage[]>([])
    const isOpen = ref(false)
    const isLoading = ref(false)
    const pendingConfig = ref<any>(null)
    const streamingContent = ref('')

    // 预览状态
    const previewMode = ref<PreviewMode>(null)           // 当前预览模式
    const isMinimized = ref(false)                       // 窗口是否最小化
    const changeSummary = ref<ChangeSummary | null>(null) // 变更摘要

    // 位置状态 (Position State)
    const buttonPosition = ref({ x: window.innerWidth - 88, y: window.innerHeight - 144 }) // 默认位置

    // 计算属性 (Getters)
    const isConfigured = computed(() => isCozeConfigured())

    const hasMessages = computed(() => messages.value.length > 0)

    const hasPendingConfig = computed(() => pendingConfig.value !== null)

    // 是否有预览配置
    const hasPreviewConfig = computed(() => pendingConfig.value !== null)

    // 动作 (Actions)

    /**
     * 切换 AI 聊天窗口的显示状态
     */
    function toggleWindow() {
        isOpen.value = !isOpen.value
    }

    /**
     * 打开 AI 聊天窗口
     */
    function openWindow() {
        isOpen.value = true
    }

    /**
     * 关闭 AI 聊天窗口
     */
    function closeWindow() {
        isOpen.value = false
    }

    /**
     * 生成唯一的消 ID
     */
    function generateId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    /**
     * 向 AI 发送消息
     */
    async function sendMessage(content: string) {
        if (!content.trim() || isLoading.value) return

        // 添加用户消息
        const userMessage: AIMessage = {
            id: generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
            status: 'complete'
        }
        messages.value.push(userMessage)

        // 为助手响应创建占位符
        const assistantMessage: AIMessage = {
            id: generateId(),
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            status: 'streaming'
        }
        messages.value.push(assistantMessage)

        isLoading.value = true
        streamingContent.value = ''

        // 准备 API 消息（仅包含已完成的消息）
        const apiMessages = messages.value
            .filter(m => m.status === 'complete')
            .map(m => ({
                role: m.role,
                content: m.content
            }))

        try {
            await streamChat(
                apiMessages,
                // onChunk - 更新流式内容
                (chunk) => {
                    streamingContent.value += chunk
                    // 使用流式内容更新助手消息
                    const lastMsg = messages.value[messages.value.length - 1]
                    if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content = streamingContent.value
                    }
                },
                // onComplete - 完成消息并检查配置
                (fullResponse, configJson) => {
                    const lastMsg = messages.value[messages.value.length - 1]
                    if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content = fullResponse
                        lastMsg.status = 'complete'

                        if (configJson) {
                            lastMsg.type = 'config_preview'
                            lastMsg.configData = configJson
                            // 生成预览配置 (V9 结构)
                            generatePreviewConfigs(configJson)
                        }
                    }
                    isLoading.value = false
                    streamingContent.value = ''
                },
                // onError - 处理错误
                (error) => {
                    const lastMsg = messages.value[messages.value.length - 1]
                    if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content = `抱歉，发生了错误：${error.message}`
                        lastMsg.status = 'error'
                    }
                    isLoading.value = false
                    streamingContent.value = ''
                    toast.error('AI 请求失败', { description: error.message })
                }
            )
        } catch (error) {
            const lastMsg = messages.value[messages.value.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
                lastMsg.content = `抱歉，发生了错误：${error instanceof Error ? error.message : String(error)}`
                lastMsg.status = 'error'
            }
            isLoading.value = false
            streamingContent.value = ''
        }
    }

    /**
     * 批准待定的配置更改
     */
    async function approveChanges() {
        if (!pendingConfig.value) return

        const configStore = useConfigStore()

        try {
            // 导入配置
            const result = configStore.importFullConfig(pendingConfig.value)

            if (result.success) {
                // 同步到云端
                await configStore.saveToSupabase()

                // 添加确认消息
                const confirmMessage: AIMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: '✅ 配置已成功更新并同步到云端！',
                    timestamp: new Date(),
                    status: 'complete'
                }
                messages.value.push(confirmMessage)

                toast.success('配置更新成功')
            } else {
                toast.error('配置导入失败', { description: result.message })
            }
        } catch (error) {
            toast.error('配置更新失败', {
                description: error instanceof Error ? error.message : String(error)
            })
        } finally {
            pendingConfig.value = null
        }
    }

    /**
     * 拒绝待定的配置更改
     */
    function rejectChanges() {
        pendingConfig.value = null

        // 添加消息以继续对话
        const rejectMessage: AIMessage = {
            id: generateId(),
            role: 'assistant',
            content: '好的，我不会应用这些更改。请告诉我您希望如何修改配置，我会继续为您提供帮助。',
            timestamp: new Date(),
            status: 'complete'
        }
        messages.value.push(rejectMessage)
    }

    /**
     * 清空所有消息
     */
    function clearMessages() {
        messages.value = []
        pendingConfig.value = null
        streamingContent.value = ''
        clearPreview()
    }

    // ============================================
    // 预览模式相关动作
    // ============================================

    /**
     * 设置预览模式
     */
    function setPreviewMode(mode: PreviewMode) {
        previewMode.value = mode
        if (mode === 'initial') {
            clearPreview()
        }
    }



    /**
     * 最小化/还原窗口
     */
    function minimizeWindow() {
        isMinimized.value = !isMinimized.value
    }

    /**
     * 生成预览配置 (基于 V9 结构)
     * V9 重构：专注于基于标题 (Title) 的匹配和合并
     * @param config - 来自 AI 的原始配置
     */
    function generatePreviewConfigs(config: any) {
        console.log('🏗️ [AIStore] Generating preview from config:', config)
        const configPageStore = useConfigPageStore()

        // 1. 标准化输入：确保我们有一个 PageConfigRecords 列表
        let recordsToPreview: any[] = []

        // 处理并标准化单个一级导航条目的辅助函数
        const processItem = (item: any) => {
            if (!item) return null

            // 情况 1: 已经是标准 PageConfigRecord 结构 { title, page_config }
            if (item.title && item.page_config) {
                return item
            }

            // 情况 2: 只有 items 但没有一级标题 (假设是当前页面的更新，或者是 V9 条目列表)
            if (Array.isArray(item.items) && !item.title) {
                // 如果 items 里的元素有 component，这可能是一个 PageConfigContent 核心
                const hasComponents = item.items.some((i: any) => i.component)
                if (hasComponents) {
                    return {
                        title: item.name || 'AI 生成配置',
                        page_config: {
                            title: item.name || 'AI 生成配置',
                            icon: item.icon || 'IconSettings',
                            isOpen: true,
                            items: item.items.map((sub: any) => ({
                                id: sub.id || sub.name,
                                name: sub.name || sub.title,
                                component: sub.component
                            }))
                        }
                    }
                }
            }

            // 情况 3: 特指单条 PageSubItem { id, name, component } 或其数组
            if (item.component && (item.id || item.name)) {
                return {
                    title: 'AI 生成页面',
                    page_config: {
                        title: 'AI 生成页面',
                        icon: 'IconSettings',
                        isOpen: true,
                        items: [{
                            id: item.id || item.name,
                            name: item.name || item.id,
                            component: item.component
                        }]
                    }
                }
            }

            // 情况 4: 标准 V9 一级导航对象 (如 test.json)
            if (item.items && Array.isArray(item.items)) {
                return {
                    title: item.title || item.name || item.id || '新导航',
                    page_config: {
                        title: item.title || item.name || item.id || '新导航',
                        icon: item.icon || 'IconSettings',
                        isOpen: item.isOpen !== false,
                        items: item.items.map((sub: any) => ({
                            id: sub.id || sub.name,
                            name: sub.name || sub.title,
                            component: sub.component
                        }))
                    }
                }
            }

            return null
        }

        // 识别输入结构并填充 recordsToPreview
        if (Array.isArray(config)) {
            // 输入直接是数组
            config.forEach(item => {
                const record = processItem(item)
                if (record) recordsToPreview.push(record)
            })
        } else if (config && typeof config === 'object') {
            // 如果是包装好的 { items: [...] } 且 items 是条目列表
            if (Array.isArray(config.items) && config.items.length > 0 && config.items[0].component) {
                // 这是一个 V9 一级导航的简化表达，或者是多个一级导航？
                // 我们先尝试按单个处理，如果 items 里的元素看起来像一级导航，则循环处理
                const first = config.items[0];
                if (first.items && Array.isArray(first.items)) {
                    config.items.forEach((it: any) => {
                        const record = processItem(it);
                        if (record) recordsToPreview.push(record);
                    });
                } else {
                    const record = processItem(config)
                    if (record) recordsToPreview.push(record)
                }
            } else {
                const record = processItem(config)
                if (record) recordsToPreview.push(record)
            }
        }

        if (recordsToPreview.length === 0) {
            console.warn('AI returned unrecognized config structure', config)
            return
        }

        // 2. 生成追加预览 (按标题合并)
        configPageStore.clearPreview()

        recordsToPreview.forEach(newRecord => {
            const existingRecord = configPageStore.getPageConfigByTitle(newRecord.title)

            if (existingRecord) {
                // 合并逻辑：
                // 1. 保留现有的 ID 和 UserID
                // 2. 合并 page_config 内部的项目（页面）
                const mergedRecord = JSON.parse(JSON.stringify(existingRecord))

                if (newRecord.page_config.items) {
                    newRecord.page_config.items.forEach((newItem: any) => {
                        const existingItemIndex = mergedRecord.page_config.items.findIndex((i: any) => i.name === newItem.name || i.id === newItem.id)
                        if (existingItemIndex > -1) {
                            // 更新现有页面组件配置
                            mergedRecord.page_config.items[existingItemIndex] = {
                                ...mergedRecord.page_config.items[existingItemIndex],
                                ...newItem
                            }
                        } else {
                            // 添加新子页面
                            mergedRecord.page_config.items.push(newItem)
                        }
                    })
                }

                configPageStore.setPreviewPageConfig(newRecord.title, mergedRecord)
            } else {
                // 新的一级导航
                configPageStore.setPreviewPageConfig(newRecord.title, newRecord)
            }
        })

        // 3. 设置 UI 状态
        previewMode.value = 'append'

        // 我们也需要同步给全局 configStore，以便让 Page1.vue 等组件感应到预览模式
        const configStore = useConfigStore()
        configStore.previewMode = 'append'

        pendingConfig.value = config
        changeSummary.value = {
            addedNavItems: recordsToPreview.filter(r => !configPageStore.getPageConfigByTitle(r.title)).length,
            modifiedNavItems: recordsToPreview.filter(r => configPageStore.getPageConfigByTitle(r.title)).length,
            deletedNavItems: 0,
            addedPageConfigs: 0,
            modifiedPageConfigs: 0
        }
    }




    /**
     * Confirm Preview and Apply Changes via Backend
     */
    async function confirmPreview() {
        if (!pendingConfig.value) return

        const configPageStore = useConfigPageStore()
        isLoading.value = true

        try {
            // 1. Identify what needs to be sent to the backend
            // The pendingConfig might be a single object or an array
            let itemsToProcess: any[] = []

            if (Array.isArray(pendingConfig.value)) {
                itemsToProcess = pendingConfig.value
            } else if (pendingConfig.value.items) {
                // Wrapper object
                itemsToProcess = pendingConfig.value.items
            } else {
                // Single item or different structure, try to normalize
                itemsToProcess = [pendingConfig.value]
            }

            // 2. Process each item (Sequential for safety in experiment)
            let successCount = 0
            for (const item of itemsToProcess) {
                // Determine Page Title
                // The AI might return { title: 'Page1', ... } or just internal content
                // We need to be sure which page to target. 
                // For this experiment, we assume the AI returns a structure with 'title' being the Page Title
                const pageTitle = item.title || item.name || item.id

                if (!pageTitle) {
                    console.warn('Skipping item without title:', item)
                    continue
                }

                try {
                    const { error } = await supabase.functions.invoke('config-ops', {
                        body: {
                            action: 'append_ai_result',
                            page_title: pageTitle,
                            ai_result: item
                        }
                    })

                    if (error) throw error
                    successCount++
                } catch (err: any) {
                    console.error(`Failed to update page ${pageTitle}:`, err)
                    toast.error(`更新页面 ${pageTitle} 失败: ${err.message}`)
                }
            }

            if (successCount > 0) {
                // 3. Refresh local state
                await configPageStore.loadPageConfigs()

                // Add success message
                messages.value.push({
                    id: generateId(),
                    role: 'assistant',
                    content: `✅ 成功更新了 ${successCount} 个配置项！(后端处理)`,
                    timestamp: new Date(),
                    status: 'complete'
                })

                toast.success('配置已更新')
                clearPreview()
            } else {
                toast.warning('没有配置被更新，请检查 AI 返回的数据结构')
            }

        } catch (error) {
            toast.error('配置更新失败', {
                description: error instanceof Error ? error.message : String(error)
            })
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Cancel Preview
     */
    function cancelPreview() {
        clearPreview()
        messages.value.push({
            id: generateId(),
            role: 'assistant',
            content: '已取消预览。',
            timestamp: new Date(),
            status: 'complete'
        })
    }

    /**
     * 清除所有预览状态
     */
    function clearPreview() {
        pendingConfig.value = null
        previewMode.value = null
        changeSummary.value = null

        // 同时清除 configStore 预览
        const configPageStore = useConfigPageStore()
        configPageStore.clearPreview()
    }

    function setButtonPosition(x: number, y: number) {
        buttonPosition.value = { x, y }
    }

    return {
        // 状态
        messages,
        isOpen,
        isLoading,
        pendingConfig,
        streamingContent,
        buttonPosition,
        // 预览状态
        previewMode,
        isMinimized,
        changeSummary,
        // 计算属性
        isConfigured,
        hasMessages,
        hasPendingConfig,
        hasPreviewConfig,
        // 动作
        toggleWindow,
        openWindow,
        closeWindow,
        sendMessage,
        approveChanges,
        rejectChanges,
        clearMessages,
        // 预览相关动作
        setPreviewMode,
        minimizeWindow,
        generatePreviewConfigs,
        confirmPreview,
        cancelPreview,
        clearPreview,
        setButtonPosition
    }
})

