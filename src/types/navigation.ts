// ============================================
// 导航相关类型定义
// ============================================
import type { LucideIcon } from 'lucide-vue-next'
import type { Page1ConfigData } from './page-config'

export interface NavSubItem {
    id: string
    name: string
    url?: string
    badge?: string
    template?: string
    component?: Page1ConfigData
}

export interface NavMainItem {
    id: string
    title: string
    url?: string
    icon?: any
    isOpen?: boolean
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

