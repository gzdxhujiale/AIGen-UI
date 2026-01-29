/**
 * 生成虚拟数据
 * @param col 列配置
 * @param index 行索引
 */
export function generateMockValue(col: any, index: number): string | number {
    const format = col.mockFormat
    const label = col.label
    const mockList = col.mockList

    // 如果 mockFormat 未定义或为 'none'，返回空字符串
    if (!format || format === 'none') {
        return ''
    }

    switch (format) {
        case 'list':
            if (mockList && mockList.length > 0) {
                const randomIndex = Math.floor(Math.random() * mockList.length)
                return mockList[randomIndex]
            }
            return `${label}${index + 1}`
        case 'list-order':
            // 从列表顺序：按行索引循环选取列表中的值
            if (mockList && mockList.length > 0) {
                return mockList[index % mockList.length]
            }
            return `${label}${index + 1}`
        case 'text':
            return `${label}${index + 1}`
        case 'datetime':
            const now = new Date()
            // 逆序生成：基于当前时间，每一行递减一天
            const date = new Date(now.getTime() - index * 24 * 60 * 60 * 1000)

            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()

            const randomHours = Math.floor(Math.random() * 24)
            const randomMinutes = Math.floor(Math.random() * 60)
            const randomSeconds = Math.floor(Math.random() * 60)

            const h = String(randomHours).padStart(2, '0')
            const m = String(randomMinutes).padStart(2, '0')
            const s = String(randomSeconds).padStart(2, '0')
            return `${year}-${month}-${day} ${h}:${m}:${s}`
        case 'number':
            return Math.floor(10000 + Math.random() * 90000)
        case 'conditional':
            // 条件格式：根据其他列的值来决定显示什么
            // 需要在调用方处理（因为依赖其他列的值）
            return ''
        default:
            return ''
    }
}

/**
 * 评估条件格式规则
 * @param row 当前行数据
 * @param rules 条件规则数组
 */
export function evaluateConditionalValue(
    row: Record<string, any>,
    rules: Array<{ sourceColumn: string; operator: string; compareValue: string; displayValue: string }>
): string {
    for (const rule of rules) {
        const sourceValue = row[rule.sourceColumn]
        const compareValue = rule.compareValue
        let matched = false

        // 转换为数字进行比较（如果可能）
        const numSource = parseFloat(sourceValue)
        const numCompare = parseFloat(compareValue)
        const canCompareAsNumber = !isNaN(numSource) && !isNaN(numCompare)

        switch (rule.operator) {
            case '==':
            case '===':
                matched = String(sourceValue) === String(compareValue)
                break
            case '!=':
            case '!==':
                matched = String(sourceValue) !== String(compareValue)
                break
            case '>':
                matched = canCompareAsNumber && numSource > numCompare
                break
            case '<':
                matched = canCompareAsNumber && numSource < numCompare
                break
            case '>=':
                matched = canCompareAsNumber && numSource >= numCompare
                break
            case '<=':
                matched = canCompareAsNumber && numSource <= numCompare
                break
            case 'contains':
                matched = String(sourceValue).includes(String(compareValue))
                break
            default:
                matched = false
        }

        if (matched) {
            return rule.displayValue
        }
    }
    return '' // 没有匹配的规则
}
