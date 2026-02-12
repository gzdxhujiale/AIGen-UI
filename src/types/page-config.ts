// ============================================
// 页面配置相关类型定义
// ============================================
import type {
    FilterType,
    ColumnType,
    FixedPosition,
    AlignOption,
    MockFormat,
    ButtonVariant,
    EffectType,
    PageType
} from './config'

/**
 * 树形选择节点类型
 */
export interface TreeNode {
    value: string
    label: string
    children?: TreeNode[]
}

/**
 * 筛选项配置
 */
export interface FilterConfig {
    key: string
    type: FilterType
    label: string
    placeholder?: string
    multiple?: boolean
    options?: string[]
    treeOptions?: TreeNode[]
    precision?: 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'
    disabled?: boolean
    defaultValue?: string | string[] | undefined
    visible?: boolean
    fullWidth?: boolean
    uploadMode?: 'text' | 'button' | 'dragger'
    draggerHeight?: string
}

/**
 * 筛选区布局配置
 */
export interface FilterAreaConfig {
    show?: boolean     // 是否显示筛选区
    columns: number    // 每行显示的筛选项数量
    gap: string        // 筛选项之间的间距
    filters: FilterConfig[]
}

/**
 * 卡片项配置
 */
export interface CardItemConfig {
    key: string
    title: string      // 卡片标题
    data: string | number  // 卡片数据
}

/**
 * 卡片区配置
 */
export interface CardAreaConfig {
    show: boolean           // 是否显示卡片区
    columns: number         // 每行显示的卡片数量
    gap: string             // 卡片之间的间距
    cardHeight?: string     // 卡片高度
    cardWidth?: string      // 卡片宽度
    cards: CardItemConfig[] // 卡片列表
}

/**
 * 表格列配置
 */
export interface TableColumn {
    key: string
    label: string
    width?: string                    // 列宽，如 '100px'
    minWidth?: string                 // 最小宽度
    type?: ColumnType
    fixed?: FixedPosition             // 列固定位置
    align?: AlignOption               // 对齐方式
    ellipsis?: boolean                // 是否显示省略号
    tooltip?: boolean                 // 是否显示提示
    visible?: boolean
    mockFormat?: MockFormat           // 虚拟数据格式
    mockList?: string[] // 当格式为 'list' 或 'list-order' 时的候选数据
    mockDigits?: number // 当格式为 'random-number' 时的位数（默认5）
    conditionRules?: Array<{ sourceColumn: string; operator: string; compareValue: string; displayValue: string; color?: string }> // 条件格式规则（基于其他列的值）
    buttons?: string[] // 文字按钮列表
    sortable?: boolean                // 是否开启排序
    filterable?: boolean              // 是否开启筛选
}

/**
 * 表格区配置
 */
export interface TableAreaConfig {
    show?: boolean          // 是否显示表格区
    height?: string         // 表格容器高度
    scrollX?: boolean       // 是否启用横向滚动
    scrollY?: boolean       // 是否启用纵向滚动
    stickyHeader?: boolean  // 是否表头吸顶 (默认 true)
    showCheckbox?: boolean  // 是否显示复选框列
    fixedLayout?: boolean   // 是否使用固定布局
    pageSize?: number       // 每页显示行数
    columns: TableColumn[]
    isEmptyData?: boolean   // 是否空数据
    draggable?: boolean     // 是否启用拖拽排序
    sortableColumns?: string[] // 允许排序的列 Keys
    filterableColumns?: string[] // 允许筛选的列 Keys
}

/**
 * 表单分栏
 */
export interface FormSection {
    title?: string
    formItems: FilterConfig[]
}

/**
 * 表单页配置
 */
export interface FormPageConfig {
    formItems?: FilterConfig[]       // 单栏模式 (向后兼容)
    sections?: FormSection[]         // 多栏模式 (1-3栏)
    columnCount?: number             // 栏数 (1-3), 默认 1
    layout?: {
        columns?: number              // 表单列数
        labelPosition?: 'left' | 'top'
        maxWidth?: string             // 如 '600px'
    }
    submitText?: string               // 提交按钮文字
    cancelText?: string               // 取消按钮文字
}

/**
 * 操作按钮配置
 */
export interface ActionButtonConfig {
    key: string
    label: string
    variant?: ButtonVariant
    className?: string       // 自定义样式类
    visible?: boolean
    effectType?: EffectType
    effectConfig?: {
        title?: string
        content?: string
        formItems?: FilterConfig[]
        targetNavId?: string        // 关联的目标页面 ID (用于 'table'/'page' 效果)
        targetPageType?: PageType   // 'page' 效果：目标页面类型
    }
}

/**
 * 操作区配置
 */
export interface ActionsAreaConfig {
    show?: boolean                  // 是否显示操作区
    buttons: ActionButtonConfig[]   // 操作按钮列表
}

/**
 * Page1 模板完整配置
 */
export interface Page1Config {
    // 顶部栏选项（可选）
    topBar?: {
        appOptions?: string[]
        langOptions?: string[]
    }
    // 筛选区配置
    filterArea: FilterAreaConfig
    // 操作区配置（可选）
    actionsArea?: ActionsAreaConfig
    // 卡片区配置（可选）
    cardArea?: CardAreaConfig
    // 表格区配置
    tableArea: TableAreaConfig
    // 模拟数据生成函数
    mockData: () => any[]
}

/**
 * 不含 mockData 的配置类型（用于序列化）
 */
export type Page1ConfigData = Omit<Page1Config, 'mockData'>
