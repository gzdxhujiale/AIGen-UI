<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { Send, Trash2, Sparkles, Loader2, Check, XIcon, Minus, Replace, Plus, Eye, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAIStore, type PreviewMode } from '@/stores/aiStore'
import { useConfigStore } from '@/stores/configStore'

const aiStore = useAIStore()
const configStore = useConfigStore()

// --- Shared State from AIStore ---
const isOpen = computed(() => aiStore.isOpen)
const isMinimized = computed(() => aiStore.isMinimized)
const isLoading = computed(() => aiStore.isLoading)
const hasMessages = computed(() => aiStore.hasMessages)
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
    
    // L1: Add hidden system instruction for JSON format if it looks like a config request
    let finalContent = textToSend
    const isConfigRequest = /配置|修改|增加|删除|表格|导航/.test(textToSend)
    if (isConfigRequest) {
         finalContent += `\n\n(System Hint: If you are returning a configuration, please ensure it is valid JSON wrapped in \`\`\`json code blocks. Do not include polite phrases outside the JSON.)`
    }
    
    // Pass the original content for UI display, but send finalContent to API logic if we were modifying aiStore to support that distinction.
    // However, aiStore.sendMessage currently takes one string. 
    // To avoid showing the system hint to the user, we might need to adjust aiStore or just accept it's hidden in the logic if we could.
    // Since we can't easily hide it in the UI without changing aiStore structure significantly, 
    // we will rely on keying off 'role: user' display vs what is sent.
    // For now, let's just send it as is, or if we want to be cleaner, we modify aiStore.sendMessage to accept (displayContent, apiContent).
    // Given the constraints, I will minimalistically just append it for now, 
    // OR BETTER: We can rely on the L2/L3 cleaning in valid cases and only use this for retries.
    // Let's stick to the prompt engineering in the Retry action specifically, and maybe light hinting here.
    
    aiStore.sendMessage(finalContent)
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

function handleSetPreviewMode(mode: PreviewMode) {
    aiStore.setPreviewMode(mode)
}

function handleConfirmPreview() {
    configStore.applyPreviewConfig()
    aiStore.confirmPreview()
}

function handleCancelPreview() {
    configStore.clearPreviewConfig()
    aiStore.cancelPreview()
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
    <!-- Floating Button -->
    <Button
        class="ai-chat-button"
        :class="{ 
            'is-open': isOpen,
            'is-loading': isLoading,
            'is-dragging': isDragging,
            'is-docked': isDocked && !isOpen,
            'has-pending': hasPreviewConfig && !isOpen
        }"
        :style="buttonStyle"
        size="icon"
        @click="handleButtonClick"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
    >
        <Loader2 v-if="isLoading && !isOpen" class="ai-icon loading" :size="24" />
        <Sparkles v-else class="ai-icon" :size="24" />
        
        <span 
            v-if="(hasPreviewConfig || hasMessages) && !isOpen" 
            class="notification-dot"
            :class="{ 'pending': hasPreviewConfig }"
        />
    </Button>

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
                <div class="header-title">
                    <Sparkles :size="20" class="header-icon" />
                    <span>AI 配置助手</span>
                    <span v-if="isLoading" class="processing-dot" />
                </div>
                <div class="header-actions">
                    <Button variant="ghost" size="icon" @click="handleClear" :disabled="messages.length === 0" title="清空消息">
                        <Trash2 :size="18" />
                    </Button>
                    <Button variant="ghost" size="icon" @click="handleMinimize" title="最小化">
                        <Minus :size="18" />
                    </Button>
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
                                <div class="message-text">
                                    <span v-if="message.status === 'error'" class="error-prefix">
                                        <AlertCircle :size="16" class="inline-error-icon"/> 
                                    </span>
                                    {{ message.content }}
                                </div>
                                
                                <!-- Retry Action for Errors (Hidden for auto-retry, but kept in DOM just in case? No, removing per request) -->
                            </div>
                            <div class="message-meta">
                                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                                <Loader2 v-if="message.status === 'streaming'" :size="14" class="loading-icon" />
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

                        <div class="preview-tabs">
                            <button class="preview-tab" :class="{ active: previewMode === 'initial' }" @click="handleSetPreviewMode('initial')">
                                <Eye :size="16" /><span>当前</span>
                            </button>
                            <button class="preview-tab" :class="{ active: previewMode === 'override' }" @click="handleSetPreviewMode('override')">
                                <Replace :size="16" /><span>覆盖</span>
                            </button>
                            <button class="preview-tab" :class="{ active: previewMode === 'append' }" @click="handleSetPreviewMode('append')">
                                <Plus :size="16" /><span>追加</span>
                            </button>
                        </div>

                        <div class="mode-description">
                            <p v-if="previewMode === 'initial'">👁️ 当前配置 - 查看现有配置作为对比</p>
                            <p v-else-if="previewMode === 'override'">⚠️ 覆盖模式 - 完全替换现有配置</p>
                            <p v-else-if="previewMode === 'append'">➕ 追加模式 - 合并到现有配置</p>
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
                                <Check :size="16" />确认{{ previewMode === 'override' ? '覆盖' : '追加' }}
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
                            :disabled="isLoading"
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
.ai-chat-button {
    position: fixed;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.4);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.2);
    z-index: 1000;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, border 0.3s;
    cursor: grab;
    overflow: hidden;
    touch-action: none;
}

.ai-chat-button:not(.is-dragging) {
    transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), 
                background 0.3s, border 0.3s;
}

.ai-chat-button:active { cursor: grabbing; }

.ai-chat-button.is-docked {
    opacity: 0.6;
    border-radius: 40px;
}
.ai-chat-button.is-docked:hover {
    opacity: 1;
    transform: scale(1.05);
}

.ai-chat-button::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #a78bfa 0%, #6366f1 100%);
    opacity: 0.8;
    z-index: -1;
    transition: opacity 0.3s ease;
}

.ai-chat-button:not(.is-loading):not(.is-open):not(.is-dragging):not(.is-docked) {
    animation: float 6s ease-in-out infinite;
}

.ai-chat-button:hover:not(.is-dragging) {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.3);
}
.ai-chat-button:hover::after { opacity: 1; }

.ai-chat-button.is-open {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
}
.ai-chat-button.is-open::after { opacity: 0; }
.ai-chat-button.is-open:hover {
    background: rgba(15, 23, 42, 0.8);
    transform: rotate(90deg) scale(1.05);
}

.ai-icon {
    color: white;
    transition: all 0.4s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
.ai-chat-button.is-open .ai-icon {
    color: rgba(255, 255, 255, 0.9);
    transform: rotate(-90deg);
}
.ai-icon.loading {
    animation: spin 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) infinite;
}

.ai-chat-button.is-loading:not(.is-open) {
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5), 0 0 0 2px rgba(139, 92, 246, 0.3);
}

.notification-dot {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 10px;
    height: 10px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
    z-index: 10;
}
.notification-dot.pending {
    background: #f59e0b;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.ai-chat-button::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
    opacity: 0;
    z-index: -2;
    transition: opacity 0.3s;
    pointer-events: none;
}
.ai-chat-button:not(.is-open):hover::before {
    opacity: 1;
    animation: pulse-ring 2s infinite;
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
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2);
    pointer-events: auto;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

:root.dark .ai-chat-window, .dark .ai-chat-window {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.ai-chat-window.is-minimized {
    height: auto;
    max-height: 80px;
    bottom: 160px;
    transform-origin: bottom right;
    background: rgba(255, 255, 255, 0.9);
}
.dark .ai-chat-window.is-minimized { background: rgba(30, 41, 59, 0.9); }

.minimized-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 0.9rem;
    font-weight: 500;
    color: hsl(var(--foreground));
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: transparent; 
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.dark .chat-header { border-bottom-color: rgba(255, 255, 255, 0.05); }

.header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 1rem;
    color: hsl(var(--foreground));
}
.header-icon {
    color: #8B5CF6;
    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.4));
}

.processing-dot {
    width: 6px;
    height: 6px;
    background: #8B5CF6;
    border-radius: 50%;
    box-shadow: 0 0 8px #8B5CF6;
    animation: pulse 1.5s infinite;
}

.content-area {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
}
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
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    font-size: 0.8rem;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: all 0.2s;
}
.dark .suggestion-chip {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
}
.suggestion-chip:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: #8B5CF6;
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
    padding: 12px 18px;
    border-radius: 18px;
    font-size: 0.95rem;
    line-height: 1.6;
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.user-message .message-content {
    background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
    color: white;
    border-bottom-right-radius: 4px;
}
.assistant-message .message-content {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: hsl(var(--foreground));
    border-bottom-left-radius: 4px;
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
