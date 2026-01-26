<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Sparkles, Loader2, Check, XIcon, Minus, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useAIStore } from '@/stores/aiStore'
import { useConfigStore } from '@/stores/configStore'
import { useDraggableButton } from '@/composables/useDraggableButton'
import 'deep-chat'

const aiStore = useAIStore()
const configStore = useConfigStore()

// --- Draggable Logic ---
const { isDragging, isDocked, handleMouseDown, handleTouchStart, dragStartTime, position } = useDraggableButton()

// --- Shared State ---
const isOpen = computed(() => aiStore.isOpen)
const isLoading = computed(() => aiStore.isLoading)
const hasPreviewConfig = computed(() => aiStore.hasPreviewConfig)
const changeSummary = computed(() => aiStore.changeSummary)


// --- Deep Chat Integration ---
const deepChatRef = ref<any>(null)

const initialMessages = [
  { role: 'ai', text: '您好！我是 AI 配置助手。告诉我您想要如何修改配置，我会为您生成修改方案。' },
  { role: 'ai', html: '<div style="font-size:12px; color: #64748b;">您可以尝试说："添加一个新的筛选项" 或 "增加一个导航菜单"</div>' }
];


// Watch for store changes and update Deep Chat
// Instead of clearing and re-adding, we just let the :history prop handle it if possible,
// but Deep Chat history is not fully reactive. We need to use addMessages for new ones.
let lastProcessedCount = 0;

watch(() => aiStore.messages, (newMessages) => {
    if (!deepChatRef.value) return;

    // Case 1: Messages cleared
    if (newMessages.length === 0) {
        deepChatRef.value.clearMessages();
        deepChatRef.value.addMessages(initialMessages);
        lastProcessedCount = 0;
        return;
    }

    // Case 2: New messages added or last message update
    const newCount = newMessages.length;
    
    // If we have more messages than before, add the new ones
    if (newCount > lastProcessedCount) {
        const toAdd = newMessages.slice(lastProcessedCount).map(m => ({
            role: m.role === 'user' ? 'user' : 'ai',
            text: m.content || '',
            html: m.configData ? `<div style="font-size:12px; color:#8b5cf6; margin-top: 4px; font-weight: 500;">✨ 已生成配置预览</div>` : undefined
        }));
        deepChatRef.value.addMessages(toAdd);
        lastProcessedCount = newCount;
    } 
    // If it's the same count, but the last message has content (streaming update)
    else if (newCount > 0 && newCount === lastProcessedCount) {
        const lastMsg = newMessages[newCount - 1];
        // Deep Chat doesn't have a direct "updateMessage" API for external calls easily.
        // So for streaming, we might still need to clear and re-add the LAST message or entire history.
        // Let's try replacing only the last message if it's the assistant's
        if (lastMsg.role === 'assistant') {
            // This is still tricky. Let's fallback to a more stable "rewrite history" only when it changes significantly
            // or use the 'history' prop if it works.
            // Actually, let's use the 'history' prop and force a re-render of the component if needed.
        }
    }
}, { deep: true });



// Initial Sync
onMounted(() => {
    if (deepChatRef.value && aiStore.messages.length > 0) {
        deepChatRef.value.clearMessages();
        const initialToAdd = aiStore.messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'ai',
            text: m.content || '',
            html: m.configData ? `<div style="font-size:12px; color:#8b5cf6; margin-top: 4px; font-weight: 500;">✨ 已生成配置预览</div>` : undefined
        }));
        deepChatRef.value.addMessages(initialToAdd);
        lastProcessedCount = aiStore.messages.length;
    }
});

// --- Window Logic ---
const windowStyle = computed(() => {
    const isMobile = window.innerWidth < 640
    
    if (isMobile) {
        return {
            position: 'fixed' as const,
            left: '12px',
            right: '12px',
            bottom: '90px',
            top: '20px',
            width: 'auto',
            height: 'auto',
            zIndex: '1999'
        }
    }

    const btnX = position.value.x
    const btnY = position.value.y
    const winW = window.innerWidth
    const winH = window.innerHeight
    const width = 400
    const height = 650

    const style: Record<string, string> = {
        position: 'fixed',
        width: `${width}px`,
        height: `${height}px`,
        maxHeight: '85vh',
        zIndex: '1999'
    };

    if (btnX > winW / 2) {
        style.right = `${winW - btnX + 24}px`
        style.left = 'auto'
    } else {
        style.left = `${btnX + 80}px`
        style.right = 'auto'
    }
    
    // Vertical alignment
    const bottomSpace = winH - btnY
    if (bottomSpace < height / 2) {
        style.bottom = '100px'
        style.top = 'auto'
    } else {
        style.top = `${Math.max(20, btnY - 40)}px`
        style.bottom = 'auto'
    }

    return style;
})

const buttonStyle = computed(() => ({
    left: `${position.value.x}px`,
    top: `${position.value.y}px`
}))

function handleButtonClick() {
    if (isDragging.value) return
    if (isOpen.value) {
        aiStore.toggleWindow()
    } else {
        if (Date.now() - dragStartTime.value < 200) {
            aiStore.toggleWindow()
        }
    }
}

// --- Preview Actions ---
const handleConfirmPreview = () => {
    aiStore.confirmPreview()
    configStore.applyPreviewConfig()
}

const handleCancelPreview = () => {
    aiStore.cancelPreview()
    configStore.clearPreviewConfig()
}
// --- Deep Chat Component Configs ---
const deepChatConfigs = {
    textInput: { 
        placeholder: { text: '输入您的需求...' },
        styles: {
            container: { 
                borderRadius: '24px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                padding: '8px 12px'
            },
        } 
    },
    messageStyles: { 
        default: {
            shared: { bubble: { maxWidth: '85%', fontSize: '14px', lineHeight: '1.5', padding: '10px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' } },
            user: { bubble: { backgroundColor: '#8b5cf6', color: 'white', borderRadius: '16px 16px 4px 16px' } },
            ai: { bubble: { backgroundColor: '#f1f5f9', color: '#334155', borderRadius: '16px 16px 16px 4px' } }
        }
    },
    submitButtonStyles: {
        submit: { 
            container: { 
                default: { 
                    backgroundColor: '#8b5cf6', 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%',
                    marginRight: '6px',
                    cursor: 'pointer'
                },
                hover: { backgroundColor: '#7c3aed' }
            }
        },
        alwaysEnabled: true
    }
}
const deepChatConnectConfig = {
    handler: (message: any, signals: any) => {
        if (message.text) {
            aiStore.sendMessage(message.text);
        }
        // Satisfy Deep Chat's response format requirement with an empty string.
        // Our store-based sync will immediately handle the actual message rendering.
        signals.onResponse({ text: '' });
    }
}
</script>

<template>
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
        <div v-if="isOpen" class="ai-window-container" :style="windowStyle">
            
            <!-- Header -->
            <div class="window-header">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
                        <Sparkles :size="16" />
                    </div>
                    <div>
                        <div class="font-bold text-slate-800 text-sm leading-tight">AI 助手</div>
                        <div class="text-[10px] text-slate-500 font-medium tracking-wide">INTELLIGENT ASSISTANT</div>
                    </div>
                </div>
                
                <div class="flex items-center gap-1">
                    <button class="header-action-btn" @click="aiStore.clearMessages()" title="清空对话">
                        <Trash2 :size="15" />
                    </button>
                    <button class="header-action-btn" @click="aiStore.toggleWindow()" title="收起">
                        <Minus :size="16" />
                    </button>
                </div>
            </div>

            <!-- Chat Area -->
            <div class="window-content relative">
                <deep-chat
                    ref="deepChatRef"
                    class="deep-chat-instance"
                    :demo="false"
                    :connect="deepChatConnectConfig"
                    :initialMessages="initialMessages"
                    :textInput="deepChatConfigs.textInput"
                    :style="{ 
                        borderRadius: '0', 
                        border: 'none', 
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '100%'
                    }"
                    :messageStyles="deepChatConfigs.messageStyles"
                    :submitButtonStyles="deepChatConfigs.submitButtonStyles"
                >
                </deep-chat>

                <!-- Preview Actions Overlay -->
                <Transition name="fade-slide">
                    <div v-if="hasPreviewConfig" class="preview-actions-strip">
                        <div class="flex flex-col gap-0.5 min-w-0">
                            <div class="text-xs font-semibold text-violet-700 flex items-center gap-1.5">
                                <Check :size="12" stroke-width="3" />
                                <span>配置方案已就绪</span>
                            </div>
                            <div class="text-[10px] text-slate-500 truncate">
                                {{ changeSummary?.addedNavItems || 0 }} 导航项 · {{ changeSummary?.addedPageConfigs || 0 }} 页面配置
                            </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <Button 
                                size="sm" 
                                class="h-8 px-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow-md transition-all text-xs font-medium"
                                @click="handleConfirmPreview"
                            >
                                <Check :size="12" class="mr-1" />
                                应用
                            </Button>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                class="h-8 px-3 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-medium" 
                                @click="handleCancelPreview"
                            >
                                <XIcon :size="12" class="mr-1" />
                                取消
                            </Button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
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

/* --- Window Container --- */
.ai-window-container {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1), 
        0 8px 10px -6px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0,0,0,0.05); /* Subtle border */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform-origin: bottom right;
}

.window-header {
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    flex-shrink: 0;
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

.window-content {
    flex: 1;
    height: calc(100% - 64px);
    background: #ffffff;
    display: flex;
    flex-direction: column;
}

/* --- Preview Actions Strip --- */
.preview-actions-strip {
    position: absolute;
    bottom: 80px; /* Above standard input area */
    left: 16px; 
    right: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    padding: 10px 14px;
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1), 
        0 10px 15px -3px rgba(139, 92, 246, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
}

/* --- Deep Chat Overrides --- */
/* Variables to override internal styles if shadow dom allows, 
   but we heavily rely on props in Vue */
.deep-chat-instance {
    --deep-chat-primary: #8b5cf6;
    font-family: inherit;
}

/* --- Transitions --- */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(4px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
