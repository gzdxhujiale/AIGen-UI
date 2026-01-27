import { jsonrepair } from 'jsonrepair'

/**
 * Coze API Client
 * 
 * Provides interaction with the Coze API.
 * Adheres to V9 Architecture: Type-First, Logic Abstraction, Redundancy Reduction.
 */

// Use proxy in dev, direct URL in prod
const COZE_API_BASE = import.meta.env.DEV ? '/api/coze' : 'https://api.coze.cn'

// --- Types ---

interface CozeConfig {
    apiKey: string
    botId: string
}

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
    type?: 'text' | 'config_preview'
    configData?: any // Used for config_json response
}

interface CozeEvent {
    event: string
    data: string
}

interface CozeDetail {
    type: 'answer' | 'function_call' | 'tool_response' | 'follow_up' | 'verbose'
    content?: string
    content_type?: 'text' | 'object_string'
}

// --- Configuration ---

const getCozeConfig = (): CozeConfig | null => {
    const apiKey = import.meta.env.VITE_COZE_API_KEY
    const botId = import.meta.env.VITE_COZE_BOT_ID

    if (!apiKey || apiKey === 'your_coze_personal_access_token') {
        console.warn('⚠️ Coze API Key not configured. Please set VITE_COZE_API_KEY in .env.')
        return null
    }

    if (!botId || botId === 'your_coze_bot_id') {
        console.warn('⚠️ Coze Bot ID not configured. Please set VITE_COZE_BOT_ID in .env.')
        return null
    }

    return { apiKey, botId }
}

export function isCozeConfigured(): boolean {
    return getCozeConfig() !== null
}

// --- Helpers ---

/**
 * Async Generator: Reads stream and parses SSE events
 */
async function* readStreamEvents(reader: ReadableStreamDefaultReader<Uint8Array>): AsyncGenerator<CozeEvent> {
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line

        for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed) continue

            if (trimmed.startsWith('event:')) {
                // simple event capture, usually followed by data
            } else if (trimmed.startsWith('data:')) {
                yield {
                    event: 'message',
                    data: trimmed.slice(5).trim()
                }
            }
        }
    }
}

/**
 * Cleans response text: removes extracted JSON blocks or exposed JSON
 */
function sanitizeResponseText(fullResponse: string, hasConfig: boolean): string {
    if (!hasConfig) return fullResponse

    let finalText = fullResponse
    // Remove markdown json code blocks
    finalText = finalText.replace(/```json\s*[\s\S]*?```/gi, '')
    // Remove generic code blocks if they look like json objects
    finalText = finalText.replace(/```\s*(\{[\s\S]*?\})\s*```/gi, '')

    // If the entire text looks like a JSON object, clear it
    const trimmed = finalText.trim()
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        return ''
    }

    finalText = finalText.trim()
    return finalText || '已为您生成如下配置：'
}

// --- Main Function ---

export async function streamChat(
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    onComplete: (fullResponse: string, configJson?: any) => void,
    onError: (error: Error) => void
): Promise<void> {
    const config = getCozeConfig()
    if (!config) {
        onError(new Error('Coze API not configured. Please set VITE_COZE_API_KEY and VITE_COZE_BOT_ID in .env.'))
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
                user_id: 'user_' + Date.now(),
                stream: true,
                auto_save_history: false,
                additional_messages: cozeMessages
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Coze API request failed: ${response.status} - ${errorText}`)
        }

        if (!response.body) throw new Error('Response body is empty')

        const reader = response.body.getReader()
        let fullResponse = ''
        let configJson: any = null

        // Process Stream Events
        for await (const { data } of readStreamEvents(reader)) {
            try {
                const parsed: CozeDetail = JSON.parse(data)

                if (parsed.type === 'answer') {
                    const content = parsed.content || ''
                    fullResponse += content
                    onChunk(content)
                } else if (parsed.type === 'tool_response') {
                    // Try to parse config_json from tool_response
                    try {
                        const toolOutput = JSON.parse(parsed.content || '{}')
                        if (toolOutput.config_json) {
                            configJson = toolOutput.config_json
                        }
                    } catch { /* ignore non-json tool response */ }
                }
            } catch {
                // Ignore non-JSON data lines (e.g. stream end signals)
            }
        }

        // Fallback: Try to extract config from full text
        if (!configJson) {
            configJson = extractConfigJson(fullResponse)
        }

        const finalText = sanitizeResponseText(fullResponse, !!configJson)
        onComplete(finalText, configJson)

    } catch (error) {
        onError(error instanceof Error ? error : new Error(String(error)))
    }
}

/**
 * Complex JSON Extractor (Robust Logic)
 * Solves conjoined JSON (}{) and nested wrapper issues
 */
function extractConfigJson(content: string): any {
    if (!content) return null;

    const minimalistParse = (str: string): any | null => {
        try {
            let s = str.trim();
            if (s.startsWith('```')) {
                s = s.replace(/^```[a-z]*\s*/i, '').replace(/```$/i, '').trim();
            }
            return JSON.parse(jsonrepair(s));
        } catch { return null; }
    };

    // Bracket balancing to find the first valid JSON object block
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

    let result = findFirstBlock(content);
    if (!result) result = minimalistParse(content);

    // Recursively unwrap OpenAI-style message containers
    if (result && result.choices?.[0]?.message?.content) {
        return extractConfigJson(result.choices[0].message.content);
    }

    return result;
}
