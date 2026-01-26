import { jsonrepair } from 'jsonrepair'

/**
 * Coze API Client
 * 
 * This module provides a client for interacting with the Coze API.
 * It supports streaming chat responses using the /v3/chat endpoint.
 * Uses proxy in development to avoid CORS issues.
 */

// Use proxy in development, direct URL in production
const COZE_API_BASE = import.meta.env.DEV ? '/api/coze' : 'https://api.coze.cn'

// Get API credentials from environment
const getCozeConfig = () => {
    const apiKey = import.meta.env.VITE_COZE_API_KEY
    const botId = import.meta.env.VITE_COZE_BOT_ID

    if (!apiKey || apiKey === 'your_coze_personal_access_token') {
        console.warn('⚠️ Coze API key not configured. Please set VITE_COZE_API_KEY in .env file.')
        return null
    }

    if (!botId || botId === 'your_coze_bot_id') {
        console.warn('⚠️ Coze Bot ID not configured. Please set VITE_COZE_BOT_ID in .env file.')
        return null
    }

    return { apiKey, botId }
}

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
    type?: 'text' | 'config_preview'
    configData?: any // For config_json responses
}

export interface CozeStreamEvent {
    event: string
    data: string
}

/**
 * Send a chat message to Coze API with streaming response
 * 
 * @param messages - The conversation history
 * @param onChunk - Callback for each response chunk
 * @param onComplete - Callback when stream is complete
 * @param onError - Callback for errors
 */
export async function streamChat(
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    onComplete: (fullResponse: string, configJson?: any) => void,
    onError: (error: Error) => void
): Promise<void> {
    const config = getCozeConfig()

    if (!config) {
        onError(new Error('Coze API 未配置。请在 .env 文件中设置 VITE_COZE_API_KEY 和 VITE_COZE_BOT_ID。'))
        return
    }

    const { apiKey, botId } = config

    // Convert messages to Coze format
    const cozeMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        content_type: 'text'
    }))

    try {
        const response = await fetch(`${COZE_API_BASE}/v3/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bot_id: botId,
                user_id: 'user_' + Date.now(), // Generate a unique user ID
                stream: true,
                auto_save_history: false,
                additional_messages: cozeMessages
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Coze API 请求失败: ${response.status} - ${errorText}`)
        }

        if (!response.body) {
            throw new Error('响应体为空')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullResponse = ''
        let buffer = ''
        let configJson: any = null

        while (true) {
            const { done, value } = await reader.read()

            if (done) break

            buffer += decoder.decode(value, { stream: true })

            // Process complete lines
            const lines = buffer.split('\n')
            buffer = lines.pop() || '' // Keep incomplete line in buffer

            for (const line of lines) {
                if (!line.trim()) continue

                // Parse SSE event
                if (line.startsWith('data:')) {
                    try {
                        const data = JSON.parse(line.slice(5).trim())

                        // Handle different event types
                        if (data.type === 'answer') {
                            const content = data.content || ''
                            fullResponse += content
                            onChunk(content)
                        } else if (data.type === 'tool_response') {
                            // Tool responses might contain config_json
                            try {
                                const toolOutput = JSON.parse(data.content || '{}')
                                if (toolOutput.config_json) {
                                    configJson = toolOutput.config_json
                                }
                            } catch {
                                // Not JSON, ignore
                            }
                        } else if (data.type === 'follow_up') {
                            // Follow up suggestions, can be displayed later
                        }
                    } catch {
                        // Not JSON data line, might be event name
                    }
                }
            }
        }

        // Try to extract config_json from the full response if not found in tool_response
        if (!configJson) {
            configJson = extractConfigJson(fullResponse)
        }

        // Clean up the response text if we have a config object
        // This prevents showing the raw JSON code block in the chat bubble
        let finalText = fullResponse
        if (configJson) {
            // Remove ```json ... ``` blocks
            finalText = finalText.replace(/```json\s*[\s\S]*?```/gi, '')
            // Remove generic code blocks that look like the config
            finalText = finalText.replace(/```\s*(\{[\s\S]*?\})\s*```/gi, '')
            finalText = finalText.trim()

            // If the response becomes empty after cleaning (AI only returned JSON), 
            // add a default message so the bubble isn't empty
            if (!finalText) {
                finalText = '已为您生成如下配置：'
            }
        }

        onComplete(finalText, configJson)

    } catch (error) {
        onError(error instanceof Error ? error : new Error(String(error)))
    }
}

/**
 * 从消息内容中提取 config_json
 * 检测以下格式的配置：
 * 1. 标记为 ```json ... ``` 的 JSON 代码块
 * 2. 包含配置相关键的 JSON 对象
 * 
 * 配置标识符包括：
 * - 完整配置: pageConfigs, items
 * - 页面组件: filterArea, tableArea, cardArea, actionsArea, topBar
 * - 导航属性: navId, component, icon, title
 * - 内容细节: filters, columns, buttons, cards, mockFormat
 */
function extractConfigJson(content: string): any {
    console.log('🔍 [CozeAPI] Extracting config from content length:', content.length)

    // 配置标识符键 - 出现任何这些键都暗示这是一个配置对象
    const configIndicators = [
        'pageConfigs', 'version',  // 完整配置
        'filterArea', 'tableArea', 'cardArea', 'actionsArea', 'topBar', // 页面部分
        'filters', 'columns', 'buttons', 'cards',  // 内容部分
        'navId', 'template', 'subItems', 'items', 'component', // 导航
        'mockFormat', 'mockList', 'conditionRules', // 特定 mock 标识
        'show', 'visible', 'label', 'key', 'type' // 通用字段
    ]

    // 验证对象是否像配置的辅助函数
    const isValidConfig = (parsed: any): boolean => {
        if (typeof parsed !== 'object' || parsed === null) return false

        // 允许数组
        if (Array.isArray(parsed)) {
            if (parsed.length === 0) return false
            return isValidConfig(parsed[0])
        }

        // 强校验：如果是 V9 结构 (含 items 和 icon/title)，必须包含 component
        if ('items' in parsed && Array.isArray(parsed.items)) {
            const hasComponent = parsed.items.some((item: any) => item && item.component)
            if (hasComponent) return true
        }

        // 转换为字符串以递归检查键（简单检查）
        const jsonStr = JSON.stringify(parsed)
        const hasIndicator = configIndicators.some(key => key in parsed || jsonStr.includes(`"${key}"`))

        if (!hasIndicator) {
            console.log('⚠️ [CozeAPI] JSON parsed but no config indicators found:', Object.keys(parsed))
        }
        return hasIndicator
    }

    // V9 结构标准化 (将 V9 结构转换为 Store 可识别的 pageConfigs)
    const normalizeConfig = (parsed: any): any => {
        // 检测是否为 V9 结构: { items: [ { component: ... } ] }
        if (parsed && !parsed.pageConfigs && Array.isArray(parsed.items) && parsed.items.length > 0) {
            const firstItem = parsed.items[0]
            if (firstItem && firstItem.component) {
                console.log('🔄 [CozeAPI] V9 Structure detected, normalizing to pageConfigs...')
                const pageConfigs: Record<string, any> = {}

                parsed.items.forEach((item: any) => {
                    if (item.id && item.component) {
                        pageConfigs[item.id] = item.component
                    }
                })

                // 返回包含 pageConfigs 的对象，保留原始字段以防万一
                return {
                    ...parsed,
                    pageConfigs
                }
            }
        }
        return parsed
    }

    // 辅助函数：尝试修复并解析 JSON
    const tryParse = (str: string): any | null => {
        try {
            // 简单预处理：移除 markdown 标记
            const cleaned = str.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim()
            // 使用 jsonrepair 修复
            const repaired = jsonrepair(cleaned)
            const parsed = JSON.parse(repaired)
            return parsed
        } catch (e) {
            return null
        }
    }

    // 1. 首先尝试查找 JSON 代码块（最可靠）
    const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)```/i)
    if (jsonBlockMatch) {
        let parsed = tryParse(jsonBlockMatch[1])
        if (parsed && isValidConfig(parsed)) {
            console.log('✅ [CozeAPI] Found config in ```json block')
            return normalizeConfig(parsed)
        }
    }

    // 2. 尝试查找任何 JSON 代码块（较不严格）
    const anyJsonBlock = content.match(/```(?:json)?\s*([\{\[][\s\S]*?[\}\]])\s*```/i)
    if (anyJsonBlock) {
        let parsed = tryParse(anyJsonBlock[1])
        if (parsed && isValidConfig(parsed)) {
            console.log('✅ [CozeAPI] Found config in generic code block')
            return normalizeConfig(parsed)
        }
    }

    // 3. 尝试查找看起来像配置的原始 JSON 对象或数组
    const configPatterns = [
        /\{[\s\S]*"items"\s*:\s*\[[\s\S]*"component"[\s\S]*\]/, // 针对 V9 结构的优化正则
        /\{[\s\S]*"navGroups"[\s\S]*\}/,
        /\{[\s\S]*"pageConfigs"[\s\S]*\}/,
        /\{[\s\S]*"filterArea"[\s\S]*\}/,
        /\{[\s\S]*"tableArea"[\s\S]*\}/,
        /\{[\s\S]*"filters"\s*:\s*\[[\s\S]*\]/,
        /\{[\s\S]*"columns"\s*:\s*\[[\s\S]*\]/
    ]

    for (const pattern of configPatterns) {
        const match = content.match(pattern)
        if (match) {
            let parsed = tryParse(match[0])
            if (parsed) {
                console.log('✅ [CozeAPI] Found config via regex pattern')
                return normalizeConfig(parsed)
            }

            // JSON 无效 - 尝试平衡括号
            const extracted = extractBalancedJson(match[0])
            if (extracted) {
                const parsedExt = tryParse(extracted)
                if (parsedExt) {
                    console.log('✅ [CozeAPI] Found config via regex + balanced extraction')
                    return normalizeConfig(parsedExt)
                }
            }
        }
    }

    // 4. 兜底方案：搜索最大的平衡 { ... } 或 [ ... ] 块
    const allJsonCandidates = extractAllBalancedJsons(content)
    for (const candidate of allJsonCandidates) {
        let parsed = tryParse(candidate)
        if (parsed && isValidConfig(parsed)) {
            console.log('✅ [CozeAPI] Found config via balanced bracket search')
            return normalizeConfig(parsed)
        }
    }

    console.log('❌ [CozeAPI] No valid config found in response')
    return null
}

/**
 * 尝试从字符串中提取平衡的 JSON 对象或数组
 */
function extractBalancedJson(str: string): string | null {
    const candidates = extractAllBalancedJsons(str)
    return candidates.length > 0 ? candidates[0] : null
}

/**
 * 提取所有可能的平衡 JSON 对象/数组以找到正确的那个
 */
function extractAllBalancedJsons(str: string): string[] {
    const results: string[] = []

    // Stack specifically for braces/brackets
    const stack: string[] = []
    let start = -1

    for (let i = 0; i < str.length; i++) {
        const char = str[i]

        if (char === '{' || char === '[') {
            if (stack.length === 0) start = i
            stack.push(char)
        } else if (char === '}' || char === ']') {
            if (stack.length > 0) {
                const last = stack[stack.length - 1]
                if ((last === '{' && char === '}') || (last === '[' && char === ']')) {
                    stack.pop()
                    if (stack.length === 0 && start !== -1) {
                        results.push(str.substring(start, i + 1))
                        // Don't reset start here if we want to find distinct blocks
                        // But for nested, this logic finds the outermost
                        start = -1
                    }
                } else {
                    // Mismatched, reset (simple error handling)
                    stack.length = 0
                    start = -1
                }
            }
        }
    }

    // returning longest first as it's likely the full config
    return results.sort((a, b) => b.length - a.length)
}

/**
 * Check if Coze API is configured
 */
export function isCozeConfigured(): boolean {
    return getCozeConfig() !== null
}
