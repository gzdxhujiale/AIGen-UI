// ============================================
// 导航相关类型定义
// ============================================
import type { LucideIcon } from 'lucide-vue-next'
import type { Page1ConfigData } from './page-config'

export interface NavSubItem {
    id: string
    title: string
    name?: string // V9 兼容
    url?: string
    badge?: string // 可选徽章
    template?: string // 显式指定的模板名称 (例如: 'Page1', 'Settings')
    component?: Page1ConfigData // 内嵌页面配置 (运行时可能存在，但持久化时按 navId 分离)
}

export interface NavMainItem {
    id: string
    title: string
    url?: string
    icon?: any
    /**
     * @deprecated 请使用 isOpen 代替
     */
    isActive?: boolean
    /**
     * 一级菜单是否默认展开
     */
    isOpen?: boolean
    /**
     * 一级菜单是否可见
     */
    visible?: boolean
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
    user: UserInfo,
    teams: TeamItem[],
    navGroups: NavGroup[],
    projectGroups: ProjectGroup[],
}

// --- 菜单与顶部栏配置 ---

export interface MenuItem {
    type: 'text-button' | 'dropdown' | 'icon-button'
    label: string
    key?: string
    icon?: string
    options?: string[]
}

export interface MenuConfig {
    items: MenuItem[]
}

