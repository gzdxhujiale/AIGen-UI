/**
 * 统一错误处理工具函数
 *
 * 提供友好的错误提示和 JSON 解析能力
 *
 * @module utils/error
 */

import { Message, Modal } from '@arco-design/web-vue'

/**
 * 错误处理选项
 */
interface ErrorOptions {
    /** 是否显示详细信息（默认 false） */
    showDetail?: boolean
    /** 自定义错误标题 */
    title?: string
}

/**
 * 显示错误消息
 *
 * @param message - 用户友好的错误消息
 * @param options - 可选配置
 *
 * @example
 * ```ts
 * showError('保存失败，请重试')
 * showError('网络错误', { title: '连接失败' })
 * ```
 */
export function showError(message: string, options?: ErrorOptions): void {
    if (options?.title) {
        Modal.error({
            title: options.title,
            content: message,
        })
    } else {
        Message.error(message)
    }
}

/**
 * 显示成功消息
 *
 * @param message - 成功消息
 */
export function showSuccess(message: string): void {
    Message.success(message)
}

/**
 * 显示警告消息
 *
 * @param message - 警告消息
 */
export function showWarning(message: string): void {
    Message.warning(message)
}

/**
 * 安全解析 JSON 字符串
 *
 * @param jsonString - 要解析的 JSON 字符串
 * @param fallback - 解析失败时的默认值
 * @returns 解析结果或默认值
 *
 * @example
 * ```ts
 * const data = safeJsonParse('[1, 2, 3]', [])
 * const config = safeJsonParse(configStr, { enabled: false })
 * ```
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
    try {
        return JSON.parse(jsonString)
    } catch (e) {
        console.warn('JSON 解析失败:', e)
        return fallback
    }
}

/**
 * 安全解析 JSON 字符串，解析失败时显示错误
 *
 * @param jsonString - 要解析的 JSON 字符串
 * @param fieldName - 字段名称（用于错误提示）
 * @returns 解析结果或 null
 *
 * @example
 * ```ts
 * const treeOptions = safeJsonParseWithError('[{"key": "1"}]', '树形数据')
 * if (!treeOptions) return // 用户已收到错误提示
 * ```
 */
export function safeJsonParseWithError<T>(
    jsonString: string,
    fieldName: string
): T | null {
    try {
        return JSON.parse(jsonString)
    } catch (e) {
        showError(`${fieldName} JSON 格式错误，请检查语法`, {
            title: '解析失败',
        })
        return null
    }
}

/**
 * 确认对话框的 Promise 包装
 *
 * @param title - 对话框标题
 * @param content - 对话框内容
 * @returns Promise，确认返回 true，取消返回 false
 *
 * @example
 * ```ts
 * const confirmed = await confirmAction('确定删除？', '此操作不可恢复')
 * if (confirmed) {
 *   // 执行删除
 * }
 * ```
 */
export function confirmAction(title: string, content: string): Promise<boolean> {
    return new Promise((resolve) => {
        Modal.confirm({
            title,
            content,
            onOk: () => resolve(true),
            onCancel: () => resolve(false),
        })
    })
}
