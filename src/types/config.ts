/**
 * 配置类型常量定义
 *
 * 本文件集中管理项目中使用的配置类型常量，避免魔法字符串散落各处。
 * 用于 Config 表单组件、Page1、Settings 等相关配置场景。
 *
 * @module types/config
 */

// ============================================
// 筛选器类型
// ============================================

/**
 * 筛选器组件类型
 */
export const FILTER_TYPES = {
    /** 普通输入框 */
    INPUT: 'input',
    /** 下拉选择框 */
    SELECT: 'select',
    /** 日期范围选择器 */
    DATE_RANGE: 'date-range',
    /** 树形选择器 */
    TREE_SELECT: 'tree-select',
} as const

/** 筛选器类型的联合类型 */
export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES]

/**
 * 筛选器类型的中文标签映射
 */
export const FILTER_TYPE_LABELS: Record<FilterType, string> = {
    [FILTER_TYPES.INPUT]: '输入框',
    [FILTER_TYPES.SELECT]: '下拉框',
    [FILTER_TYPES.DATE_RANGE]: '日期范围',
    [FILTER_TYPES.TREE_SELECT]: '树形选择',
}

// ============================================
// 表格列类型
// ============================================

/**
 * 表格列渲染类型
 */
export const COLUMN_TYPES = {
    /** 普通文本 */
    TEXT: 'text',
    /** 徽标 */
    BADGE: 'badge',
    /** 状态徽标（带颜色点） */
    STATUS_BADGE: 'status-badge',
    /** 文字按钮组 */
    TEXT_BUTTON: 'text-button',
} as const

/** 表格列类型的联合类型 */
export type ColumnType = typeof COLUMN_TYPES[keyof typeof COLUMN_TYPES]

/**
 * 表格列类型的中文标签映射
 */
export const COLUMN_TYPE_LABELS: Record<ColumnType, string> = {
    [COLUMN_TYPES.TEXT]: '文本',
    [COLUMN_TYPES.BADGE]: 'Badge',
    [COLUMN_TYPES.STATUS_BADGE]: '状态',
    [COLUMN_TYPES.TEXT_BUTTON]: '按钮',
}

// ============================================
// 按钮变体
// ============================================

/**
 * 按钮样式变体
 */
export const BUTTON_VARIANTS = {
    /** 主要按钮 (Arco) */
    PRIMARY: 'primary',
    /** 线形按钮 (Arco) */
    OUTLINE: 'outline',
    /** 文本按钮 (Arco) */
    TEXT: 'text',
    /** Shadcn 边框按钮 */
    SHADCN_OUTLINE: 'shadcn-outline',
} as const

/** 按钮变体的联合类型 */
export type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

/**
 * 按钮变体的中文标签映射
 */
export const BUTTON_VARIANT_LABELS: Record<ButtonVariant, string> = {
    [BUTTON_VARIANTS.PRIMARY]: 'Primary (主要)',
    [BUTTON_VARIANTS.OUTLINE]: 'Outline (线形)',
    [BUTTON_VARIANTS.TEXT]: 'Text (文本)',
    [BUTTON_VARIANTS.SHADCN_OUTLINE]: 'Shadcn Outline',
}

// ============================================
// Mock 数据格式
// ============================================

/**
 * Mock 数据生成格式
 */
export const MOCK_FORMATS = {
    /** 无 Mock */
    NONE: 'none',
    /** 随机文本 */
    TEXT: 'text',
    /** 随机日期时间 */
    DATETIME: 'datetime',
    /** 随机数字 */
    NUMBER: 'number',
    /** 从列表中随机选取 */
    LIST: 'list',
} as const

/** Mock 格式的联合类型 */
export type MockFormat = typeof MOCK_FORMATS[keyof typeof MOCK_FORMATS]

/**
 * Mock 格式的中文标签映射
 */
export const MOCK_FORMAT_LABELS: Record<MockFormat, string> = {
    [MOCK_FORMATS.NONE]: '无',
    [MOCK_FORMATS.TEXT]: '随机文本',
    [MOCK_FORMATS.DATETIME]: '随机时间',
    [MOCK_FORMATS.NUMBER]: '随机数字',
    [MOCK_FORMATS.LIST]: '从列表随机',
}

// ============================================
// 列固定方式
// ============================================

/**
 * 表格列固定位置
 */
export const FIXED_POSITIONS = {
    /** 不固定 */
    NONE: 'none',
    /** 左侧固定 */
    LEFT: 'left',
    /** 右侧固定 */
    RIGHT: 'right',
} as const

/** 固定位置的联合类型 */
export type FixedPosition = typeof FIXED_POSITIONS[keyof typeof FIXED_POSITIONS]

// ============================================
// 对齐方式
// ============================================

/**
 * 文本对齐方式
 */
export const ALIGN_OPTIONS = {
    /** 左对齐 */
    LEFT: 'left',
    /** 居中 */
    CENTER: 'center',
    /** 右对齐 */
    RIGHT: 'right',
} as const

/** 对齐方式的联合类型 */
export type AlignOption = typeof ALIGN_OPTIONS[keyof typeof ALIGN_OPTIONS]

// ============================================
// 交互效果类型
// ============================================

/**
 * 按钮点击交互效果
 */
export const EFFECT_TYPES = {
    /** 无效果 */
    NONE: 'none',
    /** 打开弹窗 */
    MODAL: 'modal',
} as const

/** 交互效果类型的联合类型 */
export type EffectType = typeof EFFECT_TYPES[keyof typeof EFFECT_TYPES]
