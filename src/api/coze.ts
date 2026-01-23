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

        onComplete(fullResponse, configJson)

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
 * 配置标识符：
 * - navGroups / pageConfigs / version (完整导出格式)
 * - filterArea / tableArea / cardArea / actionsArea (页面配置)
 * - filters / columns / buttons (部分配置更新)
 */
function extractConfigJson(content: string): any {
    // 配置标识符键 - 出现任何这些键都暗示这是一个配置对象
    const configIndicators = [
        'navGroups', 'pageConfigs', 'version',  // 完整配置
        'filterArea', 'tableArea', 'cardArea', 'actionsArea',  // 页面部分
        'filters', 'columns', 'buttons', 'cards',  // 内容部分
        'navId', 'template', 'subItems',  // 导航
        'mockFormat', 'mockList', 'conditionRules' // 特定 mock 标识
    ]

    // 验证对象是否像配置的辅助函数
    const isValidConfig = (parsed: any): boolean => {
        if (typeof parsed !== 'object' || parsed === null) return false

        // 转换为字符串以递归检查键（简单检查）
        const jsonStr = JSON.stringify(parsed)
        return configIndicators.some(key => key in parsed || jsonStr.includes(`"${key}"`))
    }

    // 辅助函数：尝试修复并解析 JSON
    const tryParse = (str: string): any | null => {
        try {
            // 简单预处理：移除 markdown 标记
            const cleaned = str.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '')
            // 使用 jsonrepair 修复
            const repaired = jsonrepair(cleaned)
            return JSON.parse(repaired)
        } catch {
            return null
        }
    }

    // 1. 首先尝试查找 JSON 代码块（最可靠）
    const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)```/i)
    if (jsonBlockMatch) {
        const parsed = tryParse(jsonBlockMatch[1])
        if (parsed && isValidConfig(parsed)) return parsed
    }

    // 2. 尝试查找任何 JSON 代码块（较不严格）
    const anyJsonBlock = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/i)
    if (anyJsonBlock) {
        const parsed = tryParse(anyJsonBlock[1])
        if (parsed && isValidConfig(parsed)) return parsed
    }

    // 3. 尝试查找看起来像配置的原始 JSON 对象
    const configPatterns = [
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
            const parsed = tryParse(match[0])
            if (parsed) return parsed

            // JSON 无效 - 尝试平衡括号
            const extracted = extractBalancedJson(match[0])
            if (extracted) {
                const parsedExt = tryParse(extracted)
                if (parsedExt) return parsedExt
            }
        }
    }

    // 4. 兜底方案：搜索最大的平衡 { ... } 块
    const allJsonCandidates = extractAllBalancedJsons(content)
    for (const candidate of allJsonCandidates) {
        const parsed = tryParse(candidate)
        if (parsed && isValidConfig(parsed)) return parsed
    }

    return null
}

/**
 * 尝试从字符串中提取平衡的 JSON 对象
 */
function extractBalancedJson(str: string): string | null {
    let depth = 0
    let start = -1

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{') {
            if (depth === 0) start = i
            depth++
        } else if (str[i] === '}') {
            depth--
            if (depth === 0 && start !== -1) {
                return str.substring(start, i + 1)
            }
        }
    }

    return null
}

/**
 * 提取所有可能的平衡 JSON 对象以找到正确的那个
 */
function extractAllBalancedJsons(str: string): string[] {
    const results: string[] = []
    let depth = 0
    let start = -1

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{') {
            if (depth === 0) start = i
            depth++
        } else if (str[i] === '}') {
            depth--
            if (depth === 0 && start !== -1) {
                results.push(str.substring(start, i + 1))
                // Reset to search for next object (assuming they are not nested for the main config we care about)
                // If we want nested, we shouldn't reset, but Coze output usually gives one main block
                start = -1
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
