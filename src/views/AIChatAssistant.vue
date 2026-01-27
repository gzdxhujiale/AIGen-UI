<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { Send, Trash2, Sparkles, Loader2, Check, XIcon, Minus, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAIStore } from '@/stores/aiStore'
import { useConfigStore } from '@/stores/configStore'
import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'

const aiStore = useAIStore()
const configStore = useConfigStore()

// --- Shared State from AIStore ---
const isOpen = computed(() => aiStore.isOpen)
const isMinimized = computed(() => aiStore.isMinimized)
const isLoading = computed(() => aiStore.isLoading)
const hasPreviewConfig = computed(() => aiStore.hasPreviewConfig)
const position = computed(() => aiStore.buttonPosition)
const messages = computed(() => aiStore.messages)
const isConfigured = computed(() => aiStore.isConfigured)
const previewMode = computed(() => aiStore.previewMode)
const changeSummary = computed(() => aiStore.changeSummary)

// --- Button Logic (Drag & Drop) ---
const isDragging = ref(false)
const dragStartTime = ref(0)
const offset = ref({ x: 0, y: 0 })
const isDocked = ref(false)

// Window dimensions
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const updateDimensions = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
    // Ensure button stays on screen on resize
    snapToEdge()
}

// --- Window Logic ---
const inputValue = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// --- Lifecycle ---
onMounted(() => {
    window.addEventListener('resize', updateDimensions)
    snapToEdge()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
})

// --- Button Handlers ---
function handleMouseDown(e: MouseEvent) {
    if (isOpen.value) return // Disable drag when chatting
    startDrag(e.clientX, e.clientY)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
}

function handleTouchStart(e: TouchEvent) {
    if (isOpen.value) return
    const touch = e.touches[0]
    startDrag(touch.clientX, touch.clientY)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
}

function startDrag(clientX: number, clientY: number) {
    isDragging.value = false // Will be set to true on move
    dragStartTime.value = Date.now()
    offset.value = {
        x: clientX - position.value.x,
        y: clientY - position.value.y
    }
}

function handleMouseMove(e: MouseEvent) {
    e.preventDefault()
    moveDrag(e.clientX, e.clientY)
}

function handleTouchMove(e: TouchEvent) {
    const touch = e.touches[0]
    moveDrag(touch.clientX, touch.clientY)
}

function moveDrag(clientX: number, clientY: number) {
    if (!isDragging.value) {
        const dx = clientX - (position.value.x + offset.value.x)
        const dy = clientY - (position.value.y + offset.value.y)
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            isDragging.value = true
            isDocked.value = false
        }
    }
    
    if (isDragging.value) {
        let newX = clientX - offset.value.x
        let newY = clientY - offset.value.y
        newY = Math.max(10, Math.min(windowHeight.value - 74, newY))
        newX = Math.max(0, Math.min(windowWidth.value - 64, newX))
        aiStore.setButtonPosition(newX, newY)
    }
}

function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    endDrag()
}

function handleTouchEnd() {
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    endDrag()
}

function endDrag() {
    if (isDragging.value) {
        snapToEdge()
        setTimeout(() => {
            isDragging.value = false
        }, 50)
    }
}

function snapToEdge() {
    const currentX = position.value.x
    const currentY = position.value.y
    const buttonWidth = 64
    const threshold = 100
    
    let newX = currentX
    let docked = false
    
    if (currentX < threshold) {
        newX = -32
        docked = true
    } else if (windowWidth.value - (currentX + buttonWidth) < threshold) {
        newX = windowWidth.value - 32
        docked = true
    } else {
        newX = Math.max(0, Math.min(windowWidth.value - buttonWidth, currentX))
        docked = false
    }
    
    let newY = Math.max(20, Math.min(windowHeight.value - 84, currentY))
    
    aiStore.setButtonPosition(newX, newY)
    isDocked.value = docked
}

function handleButtonClick() {
    if (isDragging.value) return
    if (isOpen.value) {
        aiStore.toggleWindow()
        return
    }
    if (Date.now() - dragStartTime.value < 200) {
        if (isDocked.value) {
            if (position.value.x < 0) {
                aiStore.setButtonPosition(24, position.value.y)
            } else {
                aiStore.setButtonPosition(windowWidth.value - 88, position.value.y)
            }
            isDocked.value = false
        } else {
            aiStore.toggleWindow()
        }
    }
}

// --- Window Logic ---
// Dynamic Window Position & Style
const windowStyle = computed(() => {
    const btnX = position.value.x
    const btnY = position.value.y
    const btnSize = 64
    const gap = 16
    const winW = windowWidth.value
    const winH = windowHeight.value
    
    const style: any = {}
    
    // Horizontal Positioning
    if (btnX > winW / 2) {
        let right = winW - (btnX + btnSize)
        right = Math.max(16, right)
        style.right = `${right}px`
        style.left = 'auto'
        style.transformOrigin = 'bottom right'
    } else {
        let left = btnX
        left = Math.max(16, left)
        style.left = `${left}px`
        style.right = 'auto'
        style.transformOrigin = 'bottom left'
    }
    
    // Vertical Positioning
    if (btnY > winH / 2) {
        style.bottom = `${winH - btnY + gap}px`
        style.top = 'auto'
        if (style.transformOrigin) style.transformOrigin = style.transformOrigin.replace('top', 'bottom')
        style.maxHeight = isMinimized.value ? '80px' : `${btnY - gap - 20}px` 
    } else {
        style.top = `${btnY + btnSize + gap}px`
        style.bottom = 'auto'
        style.transformOrigin = style.transformOrigin.replace('bottom', 'top')
        style.maxHeight = isMinimized.value ? '80px' : `${winH - (btnY + btnSize + gap) - 20}px`
    }
    return style
})

const buttonStyle = computed(() => ({
    left: `${position.value.x}px`,
    top: `${position.value.y}px`
}))

// Auto-scroll
watch(messages, async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}, { deep: true })

// Handlers
function handleMinimize() {
    aiStore.minimizeWindow()
}

function handleSend(content?: string) {
    const textToSend = content || inputValue.value.trim()
    if (!textToSend || isLoading.value) return
    
    aiStore.sendMessage(textToSend)
    if (!content) inputValue.value = ''
}

function handleRetry(_messageId?: string) {
    // specific retry logic that sends a fix prompt
    const fixPrompt = "The previous response was not valid JSON or had errors. Please correct it and output ONLY the valid JSON configuration, wrapped in \`\`\`json code blocks."
    aiStore.sendMessage(fixPrompt)
}

// L5: Auto-correction
watch(isLoading, (newLoading, oldLoading) => {
    if (!newLoading && oldLoading) {
        const msgs = messages.value
        const lastMsg = msgs[msgs.length - 1]
        
        // Check conditions: Assistant message, (Error status OR (No config + Apologetic/Refusal text))
        if (lastMsg && lastMsg.role === 'assistant') {
             const isFailure = lastMsg.status === 'error' || 
                              (!lastMsg.configData && (lastMsg.content.includes('抱歉') || lastMsg.content.includes('Sorry') || lastMsg.content.includes('I cannot')))
             
             if (isFailure) {
                  // Prevent infinite loop: check if we just retried
                  const lastUserMsg = msgs[msgs.length - 2]
                  // Check if the last user message was our fix prompt (heuristic match)
                  if (lastUserMsg && lastUserMsg.content.includes('previous response was not valid JSON')) {
                      // Already retried and failed again -> Stop to avoid loop
                      return
                  }
                  
                  // Trigger auto-retry
                  // Use a small timeout to make it feel natural
                  setTimeout(() => {
                      handleRetry()
                  }, 500)
             }
        }
    }
})

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
    }
}

function handleClear() {
    aiStore.clearMessages()
    configStore.clearPreviewConfig()
}



function handleConfirmPreview() {
    // V9 逻辑：直接调用 aiStore 进行后端同步和本地更新
    aiStore.confirmPreview()
}

function handleCancelPreview() {
    aiStore.cancelPreview()
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
    <!-- Floating Button -->
    <!-- Floating Button -->
    <div 
        class="fixed z-[2000] touch-none select-none"
        :style="buttonStyle"
    >
        <button
            class="ai-trigger-btn group"
            :class="{ 
                'is-open': isOpen,
                'is-dragging': isDragging,
                'is-docked': isDocked && !isOpen,
                'has-pending': hasPreviewConfig && !isOpen
            }"
            @click="handleButtonClick"
            @mousedown="handleMouseDown"
            @touchstart="handleTouchStart"
        >
            <div class="ai-trigger-content">
                <XIcon v-if="isOpen" class="w-6 h-6 text-white transition-transform duration-300" />
                <Loader2 v-else-if="isLoading" class="w-6 h-6 animate-spin text-white" />
                <Sparkles v-else class="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <!-- Pulse ring effect when pending -->
            <span v-if="hasPreviewConfig && !isOpen" class="absolute -top-1 -right-1 flex h-4 w-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        </button>
    </div>

    <!-- Chat Window -->
    <Transition name="slide-up">
        <div 
            v-if="isOpen" 
            class="ai-chat-window" 
            :class="{ 'is-minimized': isMinimized }"
            :style="windowStyle"
        >
            <!-- Header -->
            <div class="chat-header">
                <div class="header-left">
                    <div class="header-icon-box">
                        <Sparkles :size="16" />
                    </div>
                    <div class="header-info">
                        <div class="header-title">AI 助手</div>
                        <div class="header-subtitle">INTELLIGENT ASSISTANT</div>
                    </div>
                </div>
                
                <div class="header-actions">
                    <button class="header-action-btn" @click="handleClear" :disabled="messages.length === 0" title="清空消息">
                        <Trash2 :size="15" />
                    </button>
                    <button class="header-action-btn" @click="handleMinimize" title="最小化">
                        <Minus :size="16" />
                    </button>
                </div>
            </div>

            <!-- Minimized state -->
            <div v-if="isMinimized" class="minimized-content">
                <p v-if="isLoading">AI 正在处理中...</p>
                <p v-else-if="hasPreviewConfig">有待审核的配置</p>
                <p v-else>点击展开查看对话</p>
            </div>

            <!-- Main content -->
            <template v-else>
                <div ref="messagesContainer" class="content-area">
                    <!-- Messages -->
                    <div class="chat-messages">
                        <div v-if="messages.length === 0" class="empty-state">
                            <Sparkles :size="48" class="empty-icon" />
                            <h3>您好！我是 AI 配置助手</h3>
                            <p>告诉我您想要如何修改配置，我会为您生成修改方案供您审批。</p>
                            <div class="suggestion-chips">
                                <button class="suggestion-chip" @click="inputValue = '添加一个新的筛选项'">添加新筛选项</button>
                                <button class="suggestion-chip" @click="inputValue = '修改表格列配置'">修改表格列</button>
                                <button class="suggestion-chip" @click="inputValue = '新增一个导航菜单'">新增导航菜单</button>
                            </div>
                        </div>

                        <div v-if="!isConfigured && messages.length === 0" class="config-warning">
                            <p>⚠️ Coze API 未配置。请在 .env 文件中设置 VITE_COZE_API_KEY 和 VITE_COZE_BOT_ID。</p>
                        </div>

                        <div 
                            v-for="message in messages" 
                            :key="message.id"
                            class="message"
                            :class="[message.role === 'user' ? 'user-message' : 'assistant-message', message.status]"
                        >
                            <div class="message-content">
                                <div class="message-text" v-if="message.content || message.status === 'error'">
                                    <span v-if="message.status === 'error'" class="error-prefix">
                                        <AlertCircle :size="16" class="inline-error-icon"/> 
                                    </span>
                                    {{ message.content }}
                                </div>

                                <!-- Thinking/Streaming Indicator -->
                                <div v-if="message.status === 'streaming'" class="streaming-indicator">
                                    <template v-if="!message.content">
                                        <Sparkles class="animate-pulse text-violet-500" :size="18" />
                                        <span class="text-xs text-muted-foreground ml-2">正在思考配置方案...</span>
                                    </template>
                                    <template v-else>
                                        <span class="typing-cursor">▋</span>
                                    </template>
                                </div>
                                
                                <!-- JSON Config Viewer -->
                                <div v-if="message.configData" class="config-viewer mt-3">
                                    <div class="viewer-header">
                                        <span class="text-xs font-medium text-muted-foreground">配置详情</span>
                                    </div>
                                    <JsonViewer
                                        :value="message.configData"
                                        :expand-depth="0"
                                        boxed
                                        copyable
                                        sort
                                        theme="jv-light"
                                        class="custom-json-viewer"
                                    />
                                </div>
                            </div>
                            <div class="message-meta">
                                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Preview Panel -->
                    <div v-if="hasPreviewConfig" class="preview-panel">
                        <div class="preview-header">
                            <Sparkles :size="16" />
                            <span>配置预览</span>
                            <span class="preview-hint">← 在左侧实时查看效果</span>
                        </div>

                        <div class="mode-description">
                            <p>➕ 追加模式 - 合并到现有配置</p>
                        </div>

                        <div v-if="changeSummary && previewMode !== 'initial'" class="change-summary">
                            <div class="summary-title">变更摘要</div>
                            <div class="summary-items">
                                <div v-if="changeSummary.addedNavItems > 0" class="summary-item added">
                                    <span class="icon">+</span><span>新增导航项: {{ changeSummary.addedNavItems }} 个</span>
                                </div>
                                <div v-if="changeSummary.modifiedNavItems > 0" class="summary-item modified">
                                    <span class="icon">~</span><span>修改导航项: {{ changeSummary.modifiedNavItems }} 个</span>
                                </div>
                                <div v-if="changeSummary.addedPageConfigs > 0" class="summary-item added">
                                    <span class="icon">+</span><span>新增页面配置: {{ changeSummary.addedPageConfigs }} 个</span>
                                </div>
                                <div v-if="changeSummary.modifiedPageConfigs > 0" class="summary-item modified">
                                    <span class="icon">~</span><span>修改页面配置: {{ changeSummary.modifiedPageConfigs }} 个</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="previewMode !== 'initial'" class="preview-actions">
                            <Button variant="default" size="sm" class="confirm-btn" @click="handleConfirmPreview">
                                <Check :size="16" />确认追加
                            </Button>
                            <Button variant="outline" size="sm" class="cancel-btn" @click="handleCancelPreview">
                                <XIcon :size="16" />取消
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="chat-input">
                    <div class="input-wrapper">
                        <Input
                            v-model="inputValue"
                            type="text"
                            placeholder="描述您想要的配置修改..."
                            class="input-field"
                            :disabled="false"
                            @keydown="handleKeydown"
                        />
                        <Button 
                            class="send-btn" 
                            size="icon"
                            :disabled="!inputValue.trim() || isLoading"
                            @click="() => handleSend()"
                        >
                            <Loader2 v-if="isLoading" :size="18" class="loading-icon" />
                            <Send v-else :size="18" />
                        </Button>
                    </div>
                </div>
            </template>
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

.suggestion-chips {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}
.suggestion-chip {
    padding: 8px 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s;
}
.dark .suggestion-chip {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
}
.suggestion-chip:hover {
    background: #f5f3ff;
    border-color: #ddd6fe;
    color: #7c3aed;
    transform: translateY(-1px);
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
    padding-left: 16px;
    height: 48px;
    font-size: 0.95rem;
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
</style>
