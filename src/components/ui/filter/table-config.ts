/**
 * ArcoTable 配置对象类型定义
 * 将分散的 Props 按功能分组，提高可维护性
 */

/** 滚动配置 */
export interface ScrollConfig {
    /** 横向滚动，可为 boolean、number（像素）或 string（如 '100%'） */
    x?: boolean | number | string
    /** 纵向滚动，可为 boolean、number（像素）或 string（如 '400px'） */
    y?: boolean | number | string
    /** 表头吸顶 */
    stickyHeader?: boolean
}

/** 选择配置 */
export interface SelectionConfig {
    /** 是否显示复选框列 */
    enabled?: boolean
    /** 复选框列宽度 */
    width?: number
    /** 是否显示全选按钮 */
    showCheckedAll?: boolean
}

/** 拖拽配置 */
export interface DragConfig {
    /** 列拖拽（表头拖拽排序） */
    column?: boolean
    /** 行拖拽（拖拽锚点） */
    row?: boolean
}

/** 分页配置 */
export interface PaginationConfig {
    /** 每页条数 */
    pageSize?: number
    /** 显示总数 */
    showTotal?: boolean
    /** 显示跳转输入框 */
    showJumper?: boolean
}

/** 布局配置 */
export interface LayoutConfig {
    /** 边框配置 */
    bordered?: boolean | { wrapper?: boolean; cell?: boolean; headerCell?: boolean; bodyCell?: boolean }
    /** 斑马纹 */
    stripe?: boolean
    /** 悬停效果 */
    hover?: boolean
    /** 固定表格布局 */
    fixed?: boolean
    /** 容器高度 */
    height?: string
}

/** 列配置 */
export interface ColumnConfig {
    /** 列宽可调整 */
    resizable?: boolean
}

/** 表格完整配置 */
export interface TableConfig {
    /** 滚动配置 */
    scroll?: ScrollConfig
    /** 选择配置 */
    selection?: SelectionConfig
    /** 拖拽配置 */
    drag?: DragConfig
    /** 分页配置 */
    pagination?: PaginationConfig
    /** 布局配置 */
    layout?: LayoutConfig
    /** 列配置 */
    column?: ColumnConfig
    /** 是否显示空数据状态 */
    emptyData?: boolean
    /** 是否显示表头 */
    showHeader?: boolean
}

/** 默认表格配置 */
export const defaultTableConfig: TableConfig = {
    scroll: {
        x: false,
        y: true,
        stickyHeader: true
    },
    selection: {
        enabled: true,
        width: 40,
        showCheckedAll: true
    },
    drag: {
        column: false,
        row: false
    },
    pagination: {
        pageSize: 10,
        showTotal: true,
        showJumper: true
    },
    layout: {
        bordered: true,
        stripe: false,
        hover: true,
        fixed: true,
        height: '500px'
    },
    column: {
        resizable: false
    },
    emptyData: false,
    showHeader: true
}

/** 深度合并配置的辅助函数 */
export function mergeTableConfig(userConfig?: TableConfig): Required<TableConfig> {
    const defaults = defaultTableConfig

    return {
        scroll: { ...defaults.scroll, ...userConfig?.scroll },
        selection: { ...defaults.selection, ...userConfig?.selection },
        drag: { ...defaults.drag, ...userConfig?.drag },
        pagination: { ...defaults.pagination, ...userConfig?.pagination },
        layout: { ...defaults.layout, ...userConfig?.layout },
        column: { ...defaults.column, ...userConfig?.column },
        emptyData: userConfig?.emptyData ?? defaults.emptyData ?? false,
        showHeader: userConfig?.showHeader ?? defaults.showHeader ?? true
    } as Required<TableConfig>
}
