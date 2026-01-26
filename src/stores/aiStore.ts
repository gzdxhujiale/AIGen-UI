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
}

// 预览模式类型: initial = 当前配置, override = 覆盖, append = 追加
export type PreviewMode = 'initial' | 'override' | 'append' | null

// 变更摘要类型
export interface ChangeSummary {
    addedNavItems: number
    modifiedNavItems: number
    deletedNavItems: number
    addedPageConfigs: number
    modifiedPageConfigs: number
}

export const useAIStore = defineStore('ai', () => {
    // State
    const messages = ref<AIMessage[]>([])
    const isOpen = ref(false)
    const isLoading = ref(false)
    const pendingConfig = ref<any>(null)
    const streamingContent = ref('')

    // Preview State - 预览模式状态
    const previewMode = ref<PreviewMode>(null)           // 当前预览模式
    // const previewOverrideConfig = ref<any>(null)         // 覆盖模式预览配置 (Deprecated)
    // const previewAppendConfig = ref<any>(null)           // 追加模式预览配置 (Deprecated)
    const isMinimized = ref(false)                       // 窗口是否最小化
    const changeSummary = ref<ChangeSummary | null>(null) // 变更摘要

    // Position State
    const buttonPosition = ref({ x: window.innerWidth - 88, y: window.innerHeight - 144 }) // Default position

    // Getters
    const isConfigured = computed(() => isCozeConfigured())

    const hasMessages = computed(() => messages.value.length > 0)

    const hasPendingConfig = computed(() => pendingConfig.value !== null)

    // 是否有预览配置
    const hasPreviewConfig = computed(() => pendingConfig.value !== null)

    // V9 Refactor: Preview is now handled by configPageStore's merged view
    // currentPreviewConfig is kept for compatibility but returns null as data is in store
    const currentPreviewConfig = computed(() => null)

    // Actions

    /**
     * Toggle the AI chat window
     */
    function toggleWindow() {
        isOpen.value = !isOpen.value
    }

    /**
     * Open the AI chat window
     */
    function openWindow() {
        isOpen.value = true
    }

    /**
     * Close the AI chat window
     */
    function closeWindow() {
        isOpen.value = false
    }

    /**
     * Generate a unique message ID
     */
    function generateId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    /**
     * Send a message to the AI
     */
    async function sendMessage(content: string) {
        if (!content.trim() || isLoading.value) return

        // Add user message
        const userMessage: AIMessage = {
            id: generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
            status: 'complete'
        }
        messages.value.push(userMessage)

        // Create placeholder for assistant response
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

        // Prepare messages for API (only include completed messages)
        const apiMessages = messages.value
            .filter(m => m.status === 'complete')
            .map(m => ({
                role: m.role,
                content: m.content
            }))

        try {
            await streamChat(
                apiMessages,
                // onChunk - update streaming content
                (chunk) => {
                    streamingContent.value += chunk
                    // Update the assistant message with streaming content
                    const lastMsg = messages.value[messages.value.length - 1]
                    if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content = streamingContent.value
                    }
                },
                // onComplete - finalize message and check for config
                (fullResponse, configJson) => {
                    const lastMsg = messages.value[messages.value.length - 1]
                    if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content = fullResponse
                        lastMsg.status = 'complete'

                        if (configJson) {
                            lastMsg.type = 'config_preview'
                            lastMsg.configData = configJson
                            // Generate preview configurations for both modes
                            generatePreviewConfigs(configJson)
                        }
                    }
                    isLoading.value = false
                    streamingContent.value = ''
                },
                // onError - handle errors
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
     * Approve pending config changes
     */
    async function approveChanges() {
        if (!pendingConfig.value) return

        const configStore = useConfigStore()

        try {
            // Import the config
            const result = configStore.importFullConfig(pendingConfig.value)

            if (result.success) {
                // Sync to cloud
                await configStore.saveToSupabase()

                // Add confirmation message
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
     * Reject pending config changes
     */
    function rejectChanges() {
        pendingConfig.value = null

        // Add message to continue conversation
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
     * Clear all messages
     */
    function clearMessages() {
        messages.value = []
        pendingConfig.value = null
        streamingContent.value = ''
        clearPreview()
    }

    // ============================================
    // Preview Mode Actions
    // ============================================

    /**
     * Set the preview mode
     */
    function setPreviewMode(mode: PreviewMode) {
        previewMode.value = mode
        // V9: We primarily support append mode now. 
        // If we needed to support override toggling, we would need to re-run generation logic here.
        if (mode === 'initial') {
            clearPreview()
        }
    }



    /**
     * Minimize/restore window
     */
    function minimizeWindow() {
        isMinimized.value = !isMinimized.value
    }

    /**
     * Generate preview configurations for both modes
     * @param config - The raw config from AI
     */
    /**
     * Generate preview configurations for both modes
     * @param config - The raw config from AI
     */
    /**
     * Generate preview configurations for both modes
     * V9 Refactor: Focus on Title-based matching
     * @param config - The raw config from AI
     */
    function generatePreviewConfigs(config: any) {
        const configPageStore = useConfigPageStore()

        // 1. Normalize Input: Ensure we have a list of PageConfigRecords
        let recordsToPreview: any[] = []

        // Case A: AI returns navGroups (V9 Full Structure)
        if (config.navGroups) {
            config.navGroups.forEach((group: any) => {
                group.items?.forEach((item: any) => {
                    recordsToPreview.push({
                        title: item.title || item.id,
                        page_config: {
                            title: item.title || item.id,
                            icon: item.icon || 'IconSettings',
                            isOpen: item.isOpen !== false,
                            visible: true,
                            items: item.items?.map((sub: any) => ({
                                id: sub.id || `page_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                name: sub.title || sub.name,
                                component: sub.component
                            })) || []
                        }
                    })
                })
            })
        }
        // Case B: AI returns V9 Structure (Items list with Components)
        // We handle this by splitting items into separate records if they seem to be top-level
        else if (config.items && Array.isArray(config.items)) {
            console.log('[AIStore] Processing Case B (Items List)')
            config.items.forEach((item: any) => {
                recordsToPreview.push({
                    title: item.title || item.id,
                    page_config: {
                        title: item.title || item.id,
                        icon: item.icon || 'IconSettings',
                        isOpen: item.isOpen !== false,
                        items: item.items?.map((sub: any) => ({
                            id: sub.id,
                            name: sub.title || sub.name,
                            component: sub.component || (config.pageConfigs ? config.pageConfigs[sub.id] : null)
                        })) || []
                    }
                })
            })
        }
        // Case C: AI returns a single Page Config (legacy root usually) - Only if title is present and distinct from items list logic
        // (Note: The above Case B might consume titled configs too if we are not careful. 
        //  If config has a title AND items, do we treat it as a Group (Case C) or List of Roots (Case B)?
        //  V9 usually implies the root is just a container. Let's assume Case B fits V9 better.)
        else if (config.title && config.items) {
            // This branch might now be unreachable if Case B catches it first. 
            // That's actually OK for V9, as we prefer splitting. 
            // But for legacy "System" -> "Page" updates, we might want Case C.
            // Let's refine Case B condition ?? 
            // No, let's keep Case B as primary for "items" presence.
            recordsToPreview.push({
                title: config.title,
                page_config: config
            })
        }

        if (recordsToPreview.length === 0) {
            console.warn('AI returned unrecognized config structure', config)
            return
        }

        // 2. Generate Append Preview (Merge by Title)
        // Clear previous preview first
        configPageStore.clearPreview()

        recordsToPreview.forEach(newRecord => {
            const existingRecord = configPageStore.getPageConfigByTitle(newRecord.title)

            if (existingRecord) {
                // Merge Logic:
                // 1. Keep ID and UserID from existing
                // 2. Merge page_config content
                const mergedRecord = JSON.parse(JSON.stringify(existingRecord))

                // Merge items (Pages)
                if (newRecord.page_config.items) {
                    newRecord.page_config.items.forEach((newItem: any) => {
                        const existingItemIndex = mergedRecord.page_config.items.findIndex((i: any) => i.name === newItem.name || i.id === newItem.id)
                        if (existingItemIndex > -1) {
                            // Update existing page
                            mergedRecord.page_config.items[existingItemIndex] = {
                                ...mergedRecord.page_config.items[existingItemIndex],
                                ...newItem
                            }
                        } else {
                            // Add new page
                            mergedRecord.page_config.items.push(newItem)
                        }
                    })
                }

                // Set to preview store
                configPageStore.setPreviewPageConfig(newRecord.title, mergedRecord)
            } else {
                // New Level 1 Navigation -> Just add it
                configPageStore.setPreviewPageConfig(newRecord.title, newRecord)
            }
        })

        // Set local state for UI controls
        previewMode.value = 'append'
        pendingConfig.value = config // Store raw for reference
        changeSummary.value = {
            // Simplified summary calculation
            addedNavItems: recordsToPreview.filter(r => !configPageStore.getPageConfigByTitle(r.title)).length,
            modifiedNavItems: recordsToPreview.filter(r => configPageStore.getPageConfigByTitle(r.title)).length,
            deletedNavItems: 0,
            addedPageConfigs: 0,
            modifiedPageConfigs: 0
        }
    }

    /**
     * Helper: Merge configs for append mode (Deprecated/Unused)
     */
    // function mergeConfigs(current: any, newConfig: any): any { ... }



    /**
     * Confirm and apply the current preview configuration
     */
    async function confirmPreview() {
        const configPageStore = useConfigPageStore()

        try {
            // Apply the preview
            const result = await configPageStore.applyPreview()

            if (result.success) {
                // Add confirmation message
                const modeLabel = previewMode.value === 'override' ? '覆盖' : '追加'
                const confirmMessage: AIMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: `✅ 配置已成功以${modeLabel}模式更新并同步到云端！`,
                    timestamp: new Date(),
                    status: 'complete'
                }
                messages.value.push(confirmMessage)

                toast.success(`配置已${modeLabel}更新`)

                // Clear preview state
                clearPreview()
            } else {
                toast.error('配置导入失败', { description: result.message })
            }
        } catch (error) {
            toast.error('配置更新失败', {
                description: error instanceof Error ? error.message : String(error)
            })
        }
    }

    /**
     * Cancel and clear preview
     */
    function cancelPreview() {
        clearPreview()

        // Add message to continue conversation
        const cancelMessage: AIMessage = {
            id: generateId(),
            role: 'assistant',
            content: '已取消预览。请告诉我您希望如何修改配置，我会继续为您提供帮助。',
            timestamp: new Date(),
            status: 'complete'
        }
        messages.value.push(cancelMessage)
    }

    /**
     * Clear all preview state
     */
    function clearPreview() {
        pendingConfig.value = null
        previewMode.value = null
        changeSummary.value = null

        // Also clear configStore preview
        const configPageStore = useConfigPageStore()
        configPageStore.clearPreview()
    }

    function setButtonPosition(x: number, y: number) {
        buttonPosition.value = { x, y }
    }

    return {
        // State
        messages,
        isOpen,
        isLoading,
        pendingConfig,
        streamingContent,
        buttonPosition,
        // Preview State
        previewMode,
        // previewOverrideConfig,
        // previewAppendConfig,
        isMinimized,
        changeSummary,
        // Getters
        isConfigured,
        hasMessages,
        hasPendingConfig,
        hasPreviewConfig,
        currentPreviewConfig,
        // Actions
        toggleWindow,
        openWindow,
        closeWindow,
        sendMessage,
        approveChanges,
        rejectChanges,
        clearMessages,
        // Preview Actions
        setPreviewMode,
        minimizeWindow,
        generatePreviewConfigs,
        confirmPreview,
        cancelPreview,
        clearPreview,
        setButtonPosition
    }
})

