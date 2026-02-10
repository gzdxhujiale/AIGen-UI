<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { Send, Trash2, Sparkles, Loader2, Check, XIcon, Minus, AlertCircle, Clock, Plus, MessageSquare, Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Popconfirm as APopconfirm } from '@arco-design/web-vue'
import { useAIStore } from '@/stores/aiStore'
import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'

const aiStore = useAIStore()
const configStore = useConfigStore()
const authStore = useAuthStore()

// --- State Proxies ---
const isOpen = computed(() => aiStore.isOpen)
const isMinimized = computed(() => aiStore.isMinimized)
const isLoading = computed(() => aiStore.isLoading)
const hasPreviewConfig = computed(() => aiStore.hasPreviewConfig)
const messages = computed(() => aiStore.messages)
const isConfigured = computed(() => aiStore.isConfigured)
const previewMode = computed(() => aiStore.previewMode)
const changeSummary = computed(() => aiStore.changeSummary)
const sessions = computed(() => aiStore.sessions)
const currentSessionId = computed(() => aiStore.currentSessionId)

const isHistoryOpen = ref(false)

// --- Constants & Configs (Data-Driven) ---


const FIX_JSON_PROMPT = "The previous response was not valid JSON or had errors. Please correct it and output ONLY the valid JSON configuration, wrapped in \`\`\`json code blocks."

const TABS_CONFIG = [
    { 
        label: '✏️ 修改当前页', 
        template: '用户指令：{{用户指令}}。需要修改的页面json配置：{{当前页面json配置}}。' 
    },
    { 
        label: '📝 创建新页面', 
        template: '用户指令：{{用户指令}}。需要创建一个新页面' 
    }
]

// Default to the first tab if no template is selected
if (!aiStore.contextTemplate) {
    aiStore.contextTemplate = TABS_CONFIG[0].template
}

const activeTabLabel = computed(() => {
    const found = TABS_CONFIG.find(t => t.template === aiStore.contextTemplate)
    return found ? found.label : TABS_CONFIG[0].label
})

const SUMMARY_ITEMS = computed(() => [
    { key: 'addedNavItems', label: '新增导航项', type: 'added' },
    { key: 'modifiedNavItems', label: '修改导航项', type: 'modified' },
    { key: 'addedPageConfigs', label: '新增页面配置', type: 'added' },
    { key: 'modifiedPageConfigs', label: '修改页面配置', type: 'modified' }
])

// --- Feature: Draggable Button Logic ---
function useDraggableButton() {
    const isDragging = ref(false)
    const dragStartTime = ref(0)
    const offset = ref({ x: 0, y: 0 })
    const isDocked = ref(false)
    const windowWidth = ref(window.innerWidth)
    const windowHeight = ref(window.innerHeight)

    const position = computed(() => aiStore.buttonPosition)

    const updateDim = () => {
        windowWidth.value = window.innerWidth
        windowHeight.value = window.innerHeight
        snapToEdge()
    }

    const snapToEdge = () => {
        const { x: currX, y: currY } = position.value
        const btnW = 64, threshold = 100
        let newX = currX, docked = false

        if (currX < threshold) { newX = -32; docked = true }
        else if (windowWidth.value - (currX + btnW) < threshold) { newX = windowWidth.value - 32; docked = true }
        else { newX = Math.max(0, Math.min(windowWidth.value - btnW, currX)); docked = false }

        aiStore.setButtonPosition(newX, Math.max(20, Math.min(windowHeight.value - 84, currY)))
        isDocked.value = docked
    }

    const handleStart = (clientX: number, clientY: number) => {
        if (isOpen.value) return
        isDragging.value = false
        dragStartTime.value = Date.now()
        offset.value = { x: clientX - position.value.x, y: clientY - position.value.y }
    }

    const handleMove = (clientX: number, clientY: number) => {
         const dx = clientX - (position.value.x + offset.value.x)
         const dy = clientY - (position.value.y + offset.value.y)
         if (!isDragging.value && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
             isDragging.value = true; isDocked.value = false
         }
         if (isDragging.value) {
             let nx = clientX - offset.value.x, ny = clientY - offset.value.y
             aiStore.setButtonPosition(
                 Math.max(0, Math.min(windowWidth.value - 64, nx)), 
                 Math.max(10, Math.min(windowHeight.value - 74, ny))
             )
         }
    }

    const onMouseDown = (e: MouseEvent) => {
        handleStart(e.clientX, e.clientY)
        const onMove = (e: MouseEvent) => { e.preventDefault(); handleMove(e.clientX, e.clientY) }
        const onUp = () => {
            window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp)
            if (isDragging.value) { snapToEdge(); setTimeout(() => isDragging.value = false, 50) }
        }
        window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
    }

    const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0]; handleStart(t.clientX, t.clientY)
        const onMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY)
        const onEnd = () => {
            window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd)
            if (isDragging.value) { snapToEdge(); setTimeout(() => isDragging.value = false, 50) }
        }
        window.addEventListener('touchmove', onMove); window.addEventListener('touchend', onEnd)
    }

    const onClick = () => {
        if (isDragging.value) return
        if (isOpen.value) { aiStore.toggleWindow(); return }
        if (Date.now() - dragStartTime.value < 200) {
            if (isDocked.value) {
                aiStore.setButtonPosition(position.value.x < 0 ? 24 : windowWidth.value - 88, position.value.y)
                isDocked.value = false
            } else aiStore.toggleWindow()
        }
    }
    
    // Window Style Logic (Coupled with position)
    const windowStyle = computed(() => {
        const { x, y } = position.value
        const W = windowWidth.value, H = windowHeight.value, size = 64, gap = 16
        const s: Record<string, string> = {}
        // H-Pos
        if (x > W / 2) { s.right = `${Math.max(16, W - (x + size))}px`; s.left = 'auto'; s.transformOrigin = 'bottom right' }
        else { s.left = `${Math.max(16, x)}px`; s.right = 'auto'; s.transformOrigin = 'bottom left' }
        // V-Pos
        if (y > H / 2) {
            s.bottom = `${H - y + gap}px`; s.top = 'auto'
            if (s.transformOrigin) s.transformOrigin = s.transformOrigin.replace('top', 'bottom')
            s.maxHeight = isMinimized.value ? '80px' : `${y - gap - 20}px`
        } else {
            s.top = `${y + size + gap}px`; s.bottom = 'auto'
            s.transformOrigin = s.transformOrigin.replace('bottom', 'top')
            s.maxHeight = isMinimized.value ? '80px' : `${H - (y + size + gap) - 20}px`
        }
        return s
    })

    onMounted(() => { window.addEventListener('resize', updateDim); snapToEdge() })
    onUnmounted(() => window.removeEventListener('resize', updateDim))

    return { isDragging, isDocked, onMouseDown, onTouchStart, onClick, windowStyle, position }
}

const { isDragging, isDocked, onMouseDown, onTouchStart, onClick: handleButtonClick, windowStyle, position } = useDraggableButton()
const buttonStyle = computed(() => ({ left: `${position.value.x}px`, top: `${position.value.y}px` }))

// --- Feature: Auto Recovery ---
function setupAutoRecovery() {
    watch(isLoading, (newLoading, oldLoading) => {
        if (!newLoading && oldLoading) {
            const msgs = messages.value
            const lastMsg = msgs[msgs.length - 1]
            if (lastMsg?.role === 'assistant') {
                const isFail = lastMsg.status === 'error' || (!lastMsg.configData && (lastMsg.content.includes('Sorry') || lastMsg.content.includes('抱歉')))
                const lastUser = msgs[msgs.length - 2]
                if (isFail && !lastUser?.content.includes('previous response was not valid JSON')) {
                    autoRetryNotice.value = '检测到错误，正在自动修复…'
                    setTimeout(() => { handleRetry(); autoRetryNotice.value = '' }, 500)
                }
            }
        }
    })
}
setupAutoRecovery()

// --- UI Logic ---
const inputValue = ref('')
const autoRetryNotice = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
watch(messages, async () => { await nextTick(); if(messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight }, { deep: true })

const handleSend = (content?: string) => {
    const text = content || inputValue.value.trim()
    if (!text || isLoading.value) return
    aiStore.sendMessage(text); if (!content) inputValue.value = ''
    if (isHistoryOpen.value) isHistoryOpen.value = false
}
const handleRetry = () => aiStore.sendMessage(FIX_JSON_PROMPT)
const handleClear = () => { aiStore.clearMessages(); configStore.clearPreviewConfig() }
const handleConfirmPreview = () => aiStore.confirmPreview()
const handleCancelPreview = () => aiStore.cancelPreview()
const formatTime = (d: Date) => d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
const formatRelativeDate = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const copyMessageText = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => { /* silent success */ })
        .catch(() => { /* fallback - do nothing */ })
}

const handleInputKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
    }
}

// --- History Logic ---
const toggleHistory = () => {
    if (!authStore.isAuthenticated) return
    isHistoryOpen.value = !isHistoryOpen.value
    if (isHistoryOpen.value) aiStore.loadSessions()
}

const handleNewChat = () => {
    aiStore.createNewSession()
    isHistoryOpen.value = false
}

const handleSwitchSession = async (id: string) => {
    await aiStore.switchSession(id)
    isHistoryOpen.value = false
}

const handleDeleteSession = async (e: Event, id: string) => {
    e.stopPropagation()
    await aiStore.deleteSession(id)
}

watch(isOpen, (v) => {
    if (v && authStore.isAuthenticated) {
        aiStore.loadSessions()
        // If no current session but we have history, maybe load the first one?
        // Or just let user start fresh or pick one.
        // Let's load the latest session automatically if messages are empty and not just created
        if (messages.value.length === 0 && !currentSessionId.value) {
            // Check if we should auto-load? Maybe safest to just let user decide or start new.
            // But user asked for persistence, usually implies auto-loading last state.
             // Implemented in store logic or here?
            if (aiStore.sessions.length > 0) {
                 // aiStore.switchSession(aiStore.sessions[0].id)
            }
        }
    }
})

// Auto-load sessions on mount if authenticated and window open
onMounted(() => {
    if (authStore.isAuthenticated) aiStore.loadSessions()
})

watch(() => authStore.isAuthenticated, (v) => { 
    if(v) aiStore.loadSessions()
    else aiStore.clearMessages()
})
</script>

<template>
    <!-- Floating Button is largely unchanged but uses new handlers -->
    <div class="fixed z-[2000] touch-none select-none" :style="buttonStyle">
        <button
            class="ai-trigger-btn group"
            :class="{ 'is-open': isOpen, 'is-dragging': isDragging, 'is-docked': isDocked && !isOpen, 'has-pending': hasPreviewConfig && !isOpen }"
            @click="handleButtonClick"
            @mousedown="onMouseDown"
            @touchstart="onTouchStart"
        >
            <div class="ai-trigger-content">
                <XIcon v-if="isOpen" class="w-6 h-6 text-white transition-transform duration-300" />
                <Loader2 v-else-if="isLoading" class="w-6 h-6 animate-spin text-white" />
                <Sparkles v-else class="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span v-if="hasPreviewConfig && !isOpen" class="absolute -top-1 -right-1 flex h-4 w-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
            <!-- Docked edge hint -->
            <span v-if="isDocked && !isOpen && !isDragging" class="docked-hint" :class="position.x < 50 ? 'docked-hint-right' : 'docked-hint-left'">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor"><path d="M0 0l8 6-8 6z"/></svg>
            </span>
        </button>
    </div>

    <!-- Chat Window -->
    <Transition name="slide-up">
        <div v-if="isOpen" class="ai-chat-window" :class="{ 'is-minimized': isMinimized }" :style="windowStyle">
            <!-- Header -->
            <div class="chat-header">
                <div class="header-left">
                    <div class="header-icon-box"><Sparkles :size="16" /></div>
                    <div class="header-info"><div class="header-title">AI 助手</div><div class="header-subtitle">INTELLIGENT ASSISTANT</div></div>
                </div>
                <div class="header-actions">
                     <button v-if="authStore.isAuthenticated" class="header-action-btn" @click="handleNewChat" title="新对话"><Plus :size="18" /></button>
                     <button v-if="authStore.isAuthenticated" class="header-action-btn" :class="{ 'text-violet-600 bg-violet-50': isHistoryOpen }" @click="toggleHistory" title="历史记录"><Clock :size="16" /></button>
                    <button class="header-action-btn" @click="handleClear" :disabled="messages.length === 0" title="清空消息"><Trash2 :size="15" /></button>
                    <button class="header-action-btn" @click="aiStore.minimizeWindow" title="最小化"><Minus :size="16" /></button>
                </div>
            </div>

            <div v-if="isMinimized" class="minimized-content">
                <p v-if="isLoading">AI 正在处理中...</p>
                <p v-else-if="hasPreviewConfig">有待审核的配置</p>
                <p v-else>点击展开查看对话</p>
            </div>

            <template v-else>
                <!-- Dynamic Mode Switching Tabs -->
                <div class="mode-tabs">
                    <button 
                        v-for="tab in TABS_CONFIG"
                        :key="tab.label"
                        class="mode-tab" 
                        :class="{ active: aiStore.contextTemplate === tab.template }"
                        @click="aiStore.contextTemplate = tab.template"
                    >
                        <span>{{ tab.label }}</span>
                    </button>
                </div>

                <div ref="messagesContainer" class="content-area">
                    <div class="chat-messages">
                        <div v-if="messages.length === 0" class="empty-state">
                            <Sparkles :size="48" class="empty-icon" />
                            <h3>您好！我是 AI 配置助手</h3>
                            <!-- We can infer the active label for display text -->
                            <p>{{ activeTabLabel === '📝 创建新页面' ? '告诉我您想创建什么样的页面，我会为您生成配置。' : '告诉我您想如何修改当前页面，我会基于现有配置进行调整。' }}</p>
                        </div>

                        <div v-if="!isConfigured && messages.length === 0" class="config-warning">
                            <p>⚠️ Coze API 未配置。请在 .env 文件中设置 VITE_COZE_API_KEY 和 VITE_COZE_BOT_ID。</p>
                        </div>

                        <div v-for="message in messages" :key="message.id" class="message" :class="[message.role === 'user' ? 'user-message' : 'assistant-message', message.status]">
                            <div class="message-content">
                                <div class="message-text" v-if="message.content || message.status === 'error'">
                                    <span v-if="message.status === 'error'" class="error-prefix"><AlertCircle :size="16" class="inline-error-icon"/></span>
                                    {{ message.content }}
                                </div>
                                <div v-if="message.status === 'streaming'" class="streaming-indicator">
                                    <template v-if="!message.content"><Sparkles class="animate-pulse text-violet-500" :size="18" /><span class="text-xs text-muted-foreground ml-2">正在思考配置方案...</span></template>
                                    <template v-else><span class="typing-cursor">▋</span></template>
                                </div>
                                <div v-if="message.configData" class="config-viewer mt-3">
                                    <div class="viewer-header"><span class="text-xs font-medium text-muted-foreground">配置详情</span></div>
                                    <JsonViewer :value="message.configData" :expand-depth="0" boxed copyable sort theme="jv-light" class="custom-json-viewer"/>
                                </div>
                                <!-- Message hover actions -->
                                <div v-if="message.status !== 'streaming'" class="message-hover-actions">
                                    <button class="msg-action-btn" @click="copyMessageText(message.content)" title="复制"><Copy :size="13" /></button>
                                </div>
                            </div>
                            <div class="message-meta"><span class="message-time">{{ formatTime(message.timestamp) }}</span></div>
                        </div>
                    </div>

                    <!-- Preview Panel (Data-Driven Summary) -->
                    <div v-if="hasPreviewConfig" class="preview-panel">
                        <div class="preview-header"><Sparkles :size="16" /><span>配置预览</span><span class="preview-hint">← 在左侧实时查看效果</span></div>
                        <div class="mode-description"><p>➕ 追加模式 - 合并到现有配置</p></div>

                        <div v-if="changeSummary && previewMode !== 'initial'" class="change-summary">
                            <div class="summary-title">变更摘要</div>
                            <div class="summary-items">
                                <!-- Data-Driven Summary Loop -->
                                <template v-for="item in SUMMARY_ITEMS" :key="item.key">
                                    <div v-if="(changeSummary[item.key as keyof typeof changeSummary] as number) > 0" class="summary-item" :class="item.type">
                                        <span class="icon">{{ item.type === 'added' ? '+' : '~' }}</span>
                                        <span>{{ item.label }}: {{ changeSummary[item.key as keyof typeof changeSummary] }} 个</span>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div v-if="previewMode !== 'initial'" class="preview-actions">
                            <Button variant="default" size="sm" class="confirm-btn" @click="handleConfirmPreview"><Check :size="16" />确认追加</Button>
                            <Button variant="outline" size="sm" class="cancel-btn" @click="handleCancelPreview"><XIcon :size="16" />取消</Button>
                        </div>
                    </div>
                </div>

                <div class="chat-input">
                    <div v-if="autoRetryNotice" class="auto-retry-notice">
                        <Loader2 :size="14" class="animate-spin" />
                        <span>{{ autoRetryNotice }}</span>
                    </div>
                    <div class="input-wrapper">
                        <textarea v-model="inputValue" rows="1" placeholder="描述您想要的配置修改..." class="input-field" @keydown="handleInputKeydown" />
                        <Button class="send-btn" size="icon" :disabled="!inputValue.trim() || isLoading" @click="() => handleSend()">
                            <Loader2 v-if="isLoading" :size="18" class="loading-icon" />
                            <Send v-else :size="18" />
                        </Button>
                    </div>
                    <div class="input-hint">
                        <kbd>Enter</kbd> 发送 · <kbd>Shift+Enter</kbd> 换行
                    </div>
                </div>
            </template>
            
            <!-- History Overlay -->
            <div v-if="isHistoryOpen" class="history-overlay">
                <div class="history-header">
                    <span>历史记录</span>
                    <button class="close-history-btn" @click="isHistoryOpen = false"><XIcon :size="16"/></button>
                </div>
                <div class="history-list">
                    <div v-if="sessions.length === 0" class="history-empty">
                        <MessageSquare :size="32" class="mb-2 opacity-50"/>
                        <span>暂无历史记录</span>
                    </div>
                    <div 
                        v-for="session in sessions" 
                        :key="session.id" 
                        class="history-item"
                        :class="{ active: currentSessionId === session.id }"
                        @click="handleSwitchSession(session.id)"
                    >
                        <div class="history-info">
                            <span class="history-title truncate">{{ session.title || '未命名对话' }}</span>
                            <span class="history-date">{{ formatRelativeDate(session.updated_at) }}</span>
                        </div>
                        <APopconfirm content="确定删除该会话吗？" @ok="handleDeleteSession($event, session.id)">
                            <button class="history-delete-btn" @click.stop>
                                <Trash2 :size="14"/>
                            </button>
                        </APopconfirm>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* --- Button Styles --- */
/* --- Trigger Button --- */
.ai-trigger-btn {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    box-shadow: 
        0 4px 6px -1px rgba(124, 58, 237, 0.3),
        0 10px 15px -3px rgba(124, 58, 237, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.ai-trigger-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
}

.ai-trigger-btn:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 
        0 10px 25px -5px rgba(124, 58, 237, 0.4),
        0 8px 10px -6px rgba(124, 58, 237, 0.2);
}
.ai-trigger-btn:hover::before {
    opacity: 1;
}

.ai-trigger-btn:active {
    transform: scale(0.95);
}

.ai-trigger-btn.is-open {
    transform: rotate(90deg);
    background: #475569;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.ai-trigger-btn.is-dragging {
    cursor: grabbing;
    transition: none;
    transform: scale(1.02);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.ai-trigger-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* --- Window Styles --- */
.ai-chat-window {
    position: fixed;
    width: 420px;
    max-width: calc(100vw - 48px);
    height: 650px;
    max-height: calc(100vh - 180px);
    display: flex;
    flex-direction: column;
    z-index: 999;
    overflow: hidden;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1), 
        0 8px 10px -6px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0,0,0,0.05);
    pointer-events: auto;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: bottom right;
}

:root.dark .ai-chat-window, .dark .ai-chat-window {
    background: #1e293b;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.ai-chat-window.is-minimized {
    height: auto;
    max-height: 80px;
    bottom: 160px; /* Adjust based on button pos roughly if needed, or rely on style binding */
    background: #ffffff;
}
.dark .ai-chat-window.is-minimized { background: #1e293b; }

.minimized-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 0.9rem;
    font-weight: 500;
    color: hsl(var(--foreground));
}

/* --- Header --- */
.mode-tabs {
    display: flex;
    padding: 8px 16px;
    background: #ffffff;
    gap: 8px;
    border-bottom: 1px solid #f1f5f9;
}
.dark .mode-tabs {
    background: #1e293b;
    border-bottom-color: rgba(255, 255, 255, 0.05);
}

.mode-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}
.dark .mode-tab {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
}

.mode-tab:hover {
    background: #f1f5f9;
    color: #334155;
}
.dark .mode-tab:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
}

.mode-tab.active {
    background: #f5f3ff;
    border-color: #8b5cf6;
    color: #7c3aed;
    font-weight: 600;
}
.dark .mode-tab.active {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
    color: #a78bfa;
}

.chat-header {
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    flex-shrink: 0;
}
.dark .chat-header { 
    background: #1e293b;
    border-bottom-color: rgba(255, 255, 255, 0.05);
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-icon-box {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: #f5f3ff; /* violet-100 */
    color: #7c3aed; /* violet-600 */
    display: flex;
    align-items: center;
    justify-content: center;
}
.dark .header-icon-box {
    background-color: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
}

.header-info {
    display: flex;
    flex-direction: column;
}

.header-title {
    font-weight: 700;
    color: #1e293b;
    font-size: 0.9rem;
    line-height: 1.2;
}
.dark .header-title { color: #f8fafc; }

.header-subtitle {
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
    letter-spacing: 0.05em;
}
.dark .header-subtitle { color: #94a3b8; }

.header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.header-action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #64748b;
    transition: all 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
}
.header-action-btn:hover {
    background: #f1f5f9;
    color: #0f172a;
}
.dark .header-action-btn:hover {
    background: rgba(255,255,255,0.1);
    color: white;
}

.content-area {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    background: #ffffff; /* Explicit white background for content */
}
.dark .content-area { background: #1e293b; }

.content-area::-webkit-scrollbar { width: 4px; }
.content-area::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
.dark .content-area::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }

.chat-messages {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;
}

.empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: hsl(var(--muted-foreground));
    padding: 0 20px;
}
.empty-icon {
    color: rgba(139, 92, 246, 0.8);
    margin-bottom: 24px;
    filter: drop-shadow(0 8px 16px rgba(139, 92, 246, 0.2));
}



.message {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 85%;
    animation: message-in 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
}
@keyframes message-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.user-message { align-self: flex-end; }
.assistant-message { align-self: flex-start; }

.message-content {
    padding: 10px 14px; /* More compact for chat feel */
    border-radius: 16px;
    font-size: 0.95rem;
    line-height: 1.5;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05); /* Softer shadow */
}
.user-message .message-content {
    background: #8b5cf6; /* Solid violet */
    color: white;
    border-radius: 16px 16px 4px 16px;
}
.assistant-message .message-content {
    background: #f1f5f9; /* Slate 100 for contrast on white */
    border: none;
    color: #334155; /* Slate 700 */
    border-radius: 16px 16px 16px 4px;
}
.dark .assistant-message .message-content {
    background: #334155;
    color: #f1f5f9;
}

.error-prefix {
    color: #ef4444;
    margin-right: 6px;
    vertical-align: middle;
}
.inline-error-icon {
    display: inline-block;
    vertical-align: sub;
}

/* Streaming & Thinking Styles */
.streaming-indicator {
    display: flex;
    align-items: center;
    padding: 8px 0 4px 0;
    min-height: 24px;
}
.typing-cursor {
    display: inline-block;
    width: 6px;
    height: 14px;
    background-color: currentColor;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
    margin-left: 4px;
    opacity: 0.7;
}
@keyframes blink { 50% { opacity: 0; } }

/* JsonViewer Customizations */
.config-viewer {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.06);
    margin-top: 12px;
}
.dark .config-viewer {
    background: #1e293b;
    border-color: rgba(255,255,255,0.1);
}

.viewer-header {
    padding: 6px 12px;
    background: rgba(0,0,0,0.02);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
}
.dark .viewer-header {
    background: rgba(255,255,255,0.05);
    border-bottom-color: rgba(255,255,255,0.1);
}

/* Deep selector to override vue-json-viewer styles if needed */
:deep(.jv-container) {
    background: transparent !important;
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
:deep(.jv-container .jv-code) {
    padding: 10px;
}
:deep(.jv-container.jv-light) {
    background: transparent !important;
    white-space: nowrap;
    color: #525252;
}
:deep(.jv-container.jv-light .jv-key) {
    color: #404040;
    font-weight: 600;
}

.message-actions {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
}
.retry-btn {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    gap: 4px;
    border-radius: 12px;
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
}
.retry-btn:hover {
    background: rgba(239, 68, 68, 0.05);
    border-color: #ef4444;
}

.dark .assistant-message .message-content {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
}

.preview-panel {
    margin: 0 16px 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(10px);
}
.dark .preview-panel {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
}

.preview-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-weight: 600;
    color: hsl(var(--foreground));
}
.preview-hint {
    margin-left: auto;
    font-size: 0.7rem;
    font-weight: 400;
    color: hsl(var(--muted-foreground));
    opacity: 0.8;
}

.preview-tabs {
    display: flex;
    background: rgba(0, 0, 0, 0.05);
    padding: 4px;
    border-radius: 12px;
    margin-bottom: 16px;
}
.dark .preview-tabs { background: rgba(255, 255, 255, 0.1); }

/* History Overlay */
.history-overlay {
    position: absolute;
    top: 64px; /* header height */
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    animation: fade-in-up 0.2s ease-out;
}
.dark .history-overlay { background: #1e293b; }

.history-header {
    padding: 16px 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
}
.dark .history-header { border-bottom-color: rgba(255,255,255,0.05); }

.close-history-btn {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
}
.close-history-btn:hover { background: #f1f5f9; }

.history-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
}

.history-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 4px;
    transition: all 0.2s;
    border: 1px solid transparent;
}
.history-item:hover {
    background: #f8fafc;
}
.dark .history-item:hover { background: rgba(255,255,255,0.05); }

.history-item.active {
    background: #f5f3ff;
    border-color: rgba(139, 92, 246, 0.2);
}
.dark .history-item.active {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.2);
}

.history-info {
    flex: 1;
    min-width: 0;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.history-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: #1e293b;
}
.dark .history-title { color: #f8fafc; }

.history-date {
    font-size: 0.75rem;
    color: #94a3b8;
}

.history-delete-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #94a3b8;
    opacity: 0;
    transition: all 0.2s;
}
.history-item:hover .history-delete-btn { opacity: 1; }
.history-delete-btn:hover {
    background: #fee2e2;
    color: #ef4444;
}

.history-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94a3b8;
    font-size: 0.9rem;
}

@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.preview-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.preview-tab.active {
    background: white;
    color: #6366F1;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.dark .preview-tab.active {
    background: rgba(255, 255, 255, 0.15);
    color: white;
}

.summary-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}
.summary-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
}
.summary-item.added {
    background: rgba(34, 197, 94, 0.15);
    color: rgb(21, 128, 61);
}
.dark .summary-item.added { color: rgb(74, 222, 128); }
.summary-item.modified {
    background: rgba(234, 179, 8, 0.15);
    color: rgb(161, 98, 7);
}
.dark .summary-item.modified { color: rgb(250, 204, 21); }

.preview-actions { display: flex; gap: 12px; }

.confirm-btn {
    flex: 2;
    background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
    border: none;
    height: 36px;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: transform 0.2s;
}
.confirm-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.cancel-btn {
    flex: 1;
    height: 36px;
    border-color: rgba(0,0,0,0.1);
    background: transparent;
}
.dark .cancel-btn { border-color: rgba(255,255,255,0.1); }

.chat-input {
    padding: 16px;
    background: transparent;
    position: relative;
    border-top: none; 
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    padding: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}
.dark .input-wrapper {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
}
.input-wrapper:focus-within {
    border-color: #8B5CF6;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
    background: white;
}
.dark .input-wrapper:focus-within { background: rgba(30, 41, 59, 1); }

.input-field {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    outline: none !important;
    padding: 12px 16px;
    min-height: 44px;
    max-height: 120px;
    font-size: 0.95rem;
    flex: 1;
    resize: none;
    line-height: 1.4;
    font-family: inherit;
    color: inherit;
}

.message-hover-actions {
    display: none;
    position: absolute;
    top: 4px;
    right: 4px;
    gap: 2px;
}
.message-content:hover .message-hover-actions {
    display: flex;
}
.msg-action-btn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,0.08);
    background: rgba(255,255,255,0.9);
    color: #64748b;
    cursor: pointer;
    transition: all 0.15s;
}
.msg-action-btn:hover {
    background: #f1f5f9;
    color: #334155;
}
.dark .msg-action-btn {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(255,255,255,0.1);
    color: #94a3b8;
}
.dark .msg-action-btn:hover {
    background: rgba(51, 65, 85, 1);
    color: #e2e8f0;
}

.message-content {
    position: relative;
}

.auto-retry-notice {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    margin-bottom: 8px;
    font-size: 0.75rem;
    color: #8B5CF6;
    background: rgba(139, 92, 246, 0.08);
    border-radius: 20px;
}

.input-hint {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding-top: 6px;
    font-size: 0.65rem;
    color: #94a3b8;
}
.input-hint kbd {
    padding: 1px 4px;
    background: rgba(0,0,0,0.06);
    border-radius: 3px;
    font-family: inherit;
    font-size: 0.65rem;
}
.dark .input-hint kbd {
    background: rgba(255,255,255,0.1);
}

.send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 4px;
    background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
    border: none;
    color: white;
    transition: all 0.2s;
}
.send-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
}
.send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #e2e8f0;
}

.slide-up-enter-active, .slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(1.5); opacity: 0; }
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
}

.docked-hint {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.7);
    animation: docked-breathe 2s ease-in-out infinite;
}
.docked-hint-right { right: 6px; }
.docked-hint-left { left: 6px; transform: translateY(-50%) rotate(180deg); }
@keyframes docked-breathe {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
}
</style>
