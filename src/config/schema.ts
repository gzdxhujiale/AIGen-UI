import { ref, computed, h } from 'vue'
import {
    AudioWaveform,
    Command,
    type LucideIcon,
} from 'lucide-vue-next'
import {
    IconSettings,
} from '@arco-design/web-vue/es/icon'

// ============================================
// 类型定义 - 页面配置 (原 page1.ts)
// ============================================

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
    type: 'input' | 'select' | 'date-range' | 'tree-select'
    label: string
    placeholder?: string
    options?: string[]
    treeOptions?: TreeNode[]
    defaultValue?: string | any | undefined
    visible?: boolean
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
    type?: 'text' | 'badge' | 'status-badge' | 'text-button'
    fixed?: 'left' | 'right'          // 列固定位置
    align?: 'left' | 'center' | 'right' // 对齐方式
    ellipsis?: boolean                // 是否显示省略号
    tooltip?: boolean                 // 是否显示提示
    visible?: boolean
    mockFormat?: 'text' | 'datetime' | 'number' | 'list' // 虚拟数据格式
    mockList?: string[] // 当格式为 'list' 时的候选数据
    buttons?: string[] // 文字按钮列表
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
}

/**
 * 操作按钮配置
 */
export interface ActionButtonConfig {
    key: string
    label: string
    variant?: 'primary' | 'outline' | 'text' | 'shadcn-outline'
    className?: string       // 自定义样式类
    visible?: boolean
    effectType?: 'none' | 'modal'
    effectConfig?: {
        title?: string
        content?: string
        formItems?: FilterConfig[]
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

// ============================================
// 类型定义 - 导航配置 (原 sidebar.ts)
// ============================================

export interface NavSubItem {
    id: string
    title: string
    url: string
    badge?: string // 可选徽章
    template?: 'Page1' | 'Page2' | '' // 使用的页面模板
    component?: Page1Config // 内嵌页面配置 (Phase 2)
}

export interface NavMainItem {
    id: string
    title: string
    url: string
    icon?: any
    /**
     * @deprecated 请使用 isOpen 代替
     */
    isActive?: boolean
    /**
     * 一级菜单是否默认展开
     */
    isOpen?: boolean
    items?: NavSubItem[]
}

export interface NavGroup {
    id?: string
    label: string
    showLabel?: boolean
    items: NavMainItem[]
}

export interface ProjectItem {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export interface ProjectGroup {
    id?: string
    label: string
    showLabel?: boolean
    projects: ProjectItem[]
    showMoreButton?: boolean
}

export interface TeamPermissions {
    navMain: 'all' | string[]
    projects: 'all' | string[]
    /**
     * 细粒度控制某个导航下的子项
     * 格式: { 导航id: [子项id数组] }
     */
    navItems?: Record<string, string[]>
}

export interface TeamItem {
    name: string
    logo: LucideIcon
    plan: string
    permissions: TeamPermissions
}

export interface UserInfo {
    name: string
    email: string
    avatar: string
}

export interface SidebarConfig {
    user: UserInfo
    teams: TeamItem[]
    navGroups: NavGroup[]
    projectGroups: ProjectGroup[]
}

// ============================================
// 公共选项与常量
// ============================================

export const COMMON_OPTIONS = {
    YES_NO: ['全部', '是', '否'],
    APP: ['SoulChill', 'TikTok', 'Bigo Live', 'Likee'],
    LANG: ['中文', 'English', 'Español', 'العربية'],
}

// Custom Logo Component
const AIGenLogo = (props: any) => h('img', {
    src: import.meta.env.BASE_URL + 'ai.svg',
    ...props,
    style: 'width: 100%; height: 100%; object-fit: contain;'
})

// ============================================
// 默认配置数据
// ============================================

export const defaultSidebarConfig: SidebarConfig = {
    user: {
        name: ' ',
        email: ' ',
        avatar: '/avatars/shadcn.jpg',
    },

    teams: [
        {
            name: 'AIGen UI',
            logo: AIGenLogo,
            plan: 'online',
            permissions: {
                navMain: 'all',
                projects: 'all'
            }
        },
        {
            name: 'A部门',
            logo: AudioWaveform,
            plan: 'online',
            permissions: {
                navMain: ['workspace', 'report', 'dashboard'],
                projects: ['data-dictionary', 'user-manual']
            }
        },
        {
            name: 'B部门',
            logo: Command,
            plan: 'online',
            permissions: {
                navMain: ['rbac', 'settings'],
                projects: ['user-manual']
            }
        },
        {
            name: 'C部门',
            logo: Command,
            plan: 'online',
            permissions: {
                navMain: ['report', 'dashboard'],
                navItems: {
                    'report': ['company']
                },
                projects: []
            }
        },
    ],

    // navGroups 默认为空数组 - 配置从云端加载
    navGroups: [],

    projectGroups: [
        {
            label: ' ',
            showLabel: false,
            showMoreButton: false,
            projects: [],
        },
    ],
}

// ============================================
// 配置管理与辅助函数
// ============================================

/**
 * 合并用户配置与默认配置
 */
export function mergeSidebarConfig(
    customConfig: Partial<SidebarConfig>
): SidebarConfig {
    return {
        ...defaultSidebarConfig,
        ...customConfig,
        navGroups: customConfig.navGroups ?? defaultSidebarConfig.navGroups,
        projectGroups: customConfig.projectGroups ?? defaultSidebarConfig.projectGroups,
        teams: customConfig.teams ?? defaultSidebarConfig.teams,
    }
}

/**
 * 创建导航项
 */
export function createNavItem(
    id: string,
    title: string,
    url: string,
    icon?: any,
    subItems?: NavSubItem[],
    isActive = false
): NavMainItem {
    return {
        id,
        title,
        url,
        icon: icon || IconSettings,
        isActive,
        items: subItems,
    }
}

/**
 * 创建导航分组
 */
export function createNavGroup(label: string, items: NavMainItem[], id?: string): NavGroup {
    return { id, label, items }
}

/**
 * 创建项目项
 */
export function createProjectItem(
    id: string,
    name: string,
    url: string,
    icon: LucideIcon
): ProjectItem {
    return { id, name, url, icon }
}

/**
 * 创建项目分组
 */
export function createProjectGroup(
    label: string,
    projects: ProjectItem[],
    showMoreButton = true,
    id?: string
): ProjectGroup {
    return { id, label, projects, showMoreButton }
}

// ============================================
// 导航状态管理
// ============================================

const currentMainNav = ref('')
const currentSubNav = ref('')
const _currentNavId = ref('')
const detailTitle = ref<string | null>(null)
const _navGroupsRef = ref<NavGroup[] | null>(null)

/**
 * 初始化导航状态（在配置加载后调用）
 */
export function initNavigation(navGroups: NavGroup[]) {
    if (!navGroups || navGroups.length === 0) return

    const firstNavGroup = navGroups[0]
    const firstMainNav = firstNavGroup?.items[0]
    const firstSubNav = firstMainNav?.items?.[0]

    if (firstMainNav) {
        currentMainNav.value = firstMainNav.title
        if (firstSubNav) {
            currentSubNav.value = firstSubNav.title
            _currentNavId.value = firstSubNav.id
        }
    }
}

/**
 * 设置 navGroups 引用（由 configStore 调用）
 */
export function setNavGroupsRef(navGroups: NavGroup[]) {
    _navGroupsRef.value = navGroups
}

/**
 * 导航状态管理 Composable
 */
export function useNavigation() {
    const setNavigation = (mainNav: string, subNav: string, navId?: string) => {
        currentMainNav.value = mainNav
        currentSubNav.value = subNav
        if (navId) {
            _currentNavId.value = navId
        } else {
            const navGroups = _navGroupsRef.value || []
            for (const group of navGroups) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find(item => item.title === subNav)
                    if (subItem) {
                        _currentNavId.value = subItem.id
                        return
                    }
                }
            }
        }
    }

    const setDetailTitle = (title: string | null) => {
        detailTitle.value = title
    }

    const breadcrumbs = computed(() => ({
        main: currentMainNav.value,
        sub: currentSubNav.value,
        detail: detailTitle.value,
    }))

    const currentNavId = computed(() => _currentNavId.value)

    const currentTemplate = computed(() => {
        if (_navGroupsRef.value) {
            for (const group of _navGroupsRef.value) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find((item: NavSubItem) => item.id === _currentNavId.value)
                    if (subItem?.template) {
                        return subItem.template
                    }
                    if (subItem?.component) {
                        return 'Page1'
                    }
                }
            }
        }
        return undefined
    })

    const currentPage = computed(() => {
        if (_currentNavId.value === 'settings') return 'Settings'
        if (_currentNavId.value === 'billing') return 'Billing'
        if (_currentNavId.value === 'profile') return 'profile'

        if (currentTemplate.value) {
            return currentTemplate.value
        }
        return currentSubNav.value
    })

    return {
        currentMainNav,
        currentSubNav,
        currentNavId,
        detailTitle,
        breadcrumbs,
        currentPage,
        currentTemplate,
        setNavigation,
        setDetailTitle,
    }
}

// ============================================
// 按导航 ID 索引的页面配置 (由 configStore 同步)
// ============================================

export const page1Configs: Record<string, Page1Config> = {}
