import { jsonrepair } from 'jsonrepair'

/**
 * Coze API 客户端
 * 
 * 此模块提供与 Coze API 交互的客户端。
 * 它支持使用 /v3/chat 接口的流式聊天响应。
 * 在开发环境下使用代理以避免跨域 (CORS) 问题。
 */

// 开发环境下使用代理，生产环境下使用直接 URL
const COZE_API_BASE = import.meta.env.DEV ? '/api/coze' : 'https://api.coze.cn'

// 从环境变量获取 API 配置
const getCozeConfig = () => {
    const apiKey = import.meta.env.VITE_COZE_API_KEY
    const botId = import.meta.env.VITE_COZE_BOT_ID

    if (!apiKey || apiKey === 'your_coze_personal_access_token') {
        console.warn('⚠️ Coze API Key 未配置。请在 .env 文件中设置 VITE_COZE_API_KEY。')
        return null
    }

    if (!botId || botId === 'your_coze_bot_id') {
        console.warn('⚠️ Coze Bot ID 未配置。请在 .env 文件中设置 VITE_COZE_BOT_ID。')
        return null
    }

    return { apiKey, botId }
}

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
    type?: 'text' | 'config_preview'
    configData?: any // 用于 config_json 响应
}

export interface CozeStreamEvent {
    event: string
    data: string
}

/**
 * 发送聊天消息到 Coze API 并处理流式响应
 * 
 * @param messages - 对话历史记录
 * @param onChunk - 每个响应分块的回调函数
 * @param onComplete - 流完成后调用的回调函数
 * @param onError - 发生错误时的回调函数
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

    // 将消息转换为 Coze 格式
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
                user_id: 'user_' + Date.now(), // 生成唯一的临时用户 ID
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

            // 处理完整的行
            const lines = buffer.split('\n')
            buffer = lines.pop() || '' // 将不完整的行保留在缓冲区

            for (const line of lines) {
                if (!line.trim()) continue

                // 解析 SSE 事件
                if (line.startsWith('data:')) {
                    try {
                        const data = JSON.parse(line.slice(5).trim())

                        // 处理不同的事件类型
                        if (data.type === 'answer') {
                            const content = data.content || ''
                            fullResponse += content
                            onChunk(content)
                        } else if (data.type === 'tool_response') {
                            // 工具响应可能包含 config_json
                            try {
                                const toolOutput = JSON.parse(data.content || '{}')
                                if (toolOutput.config_json) {
                                    configJson = toolOutput.config_json
                                }
                            } catch {
                                // 非 JSON 内容，忽略
                            }
                        }
                    } catch {
                        // 非 JSON 格式的数据行
                    }
                }
            }
        }

        // 提取配置
        if (!configJson) {
            configJson = extractConfigJson(fullResponse)
        }

        // 清理响应文本
        let finalText = fullResponse
        if (configJson) {
            // 移除代码块
            finalText = finalText.replace(/```json\s*[\s\S]*?```/gi, '')
            finalText = finalText.replace(/```\s*(\{[\s\S]*?\})\s*```/gi, '')
            // 尝试移除裸露的 JSON 字符串 (简单处理：如果全文看起来只是个 JSON，就清空)
            const trimmed = finalText.trim()
            if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                finalText = ''
            }

            finalText = finalText.trim()
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
 * 从文本中精准提取配置 JSON
 * 采用递归解包与括号平衡算法，彻底解决连体 JSON (}{) 问题
 */
function extractConfigJson(content: string): any {
    if (!content) return null;

    // 内部极简解析器
    const minimalistParse = (str: string): any | null => {
        try {
            let s = str.trim();
            if (s.startsWith('```')) {
                s = s.replace(/^```[a-z]*\s*/i, '').replace(/```$/i, '').trim();
            }
            return JSON.parse(jsonrepair(s));
        } catch {
            return null;
        }
    };

    // 括号平衡寻找第一个合法的 JSON 对象项
    const findFirstBlock = (str: string): any | null => {
        const start = Math.min(...[str.indexOf('{'), str.indexOf('[')].filter(i => i !== -1));
        if (start === Infinity || start === -1) return null;

        const opener = str[start];
        const closer = opener === '{' ? '}' : ']';
        let stack = 0;
        let inString = false;
        let escaped = false;

        for (let i = start; i < str.length; i++) {
            const char = str[i];
            if (char === '"' && !escaped) inString = !inString;
            if (inString) {
                escaped = (char === '\\' && !escaped);
                continue;
            }
            if (char === opener) stack++;
            else if (char === closer) {
                stack--;
                if (stack === 0) {
                    const candidate = str.substring(start, i + 1);
                    const parsed = minimalistParse(candidate);
                    if (parsed) return parsed;
                }
            }
            escaped = (char === '\\' && !escaped);
        }
        return null;
    };

    // 1. 获取第一个完整的平衡块 (无视后续重复内容)
    let result = findFirstBlock(content);
    if (!result) result = minimalistParse(content);

    // 2. 直取核心：如果是一个 OpenAI 风格的包装容器，直接深入递归获取 message.content
    if (result && result.choices?.[0]?.message?.content) {
        console.log('📦 [CozeAPI] Diving into wrapped message content...');
        return extractConfigJson(result.choices[0].message.content);
    }

    if (result) {
        console.log('✅ [CozeAPI] Config extracted successfully');
        return result;
    }

    return null;
}

/**
 * 检查 Coze API 是否已完成基本配置
 */
export function isCozeConfigured(): boolean {
    return getCozeConfig() !== null
}
