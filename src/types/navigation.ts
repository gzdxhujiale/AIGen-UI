// ============================================
// 导航相关类型定义
// ============================================
import type { Component } from 'vue'
import type { Page1ConfigData, FormPageConfig } from './page-config'

export interface NavSubItem {
    id: string
    name: string
    pageType?: 'list' | 'form'    // 页面类型，默认 'list'
    url?: string
    badge?: string
    template?: string
    visible?: boolean
    component?: Page1ConfigData   // list 类型使用
    formConfig?: FormPageConfig   // form 类型使用
}

export interface NavMainItem {
    id: string
    title: string
    url?: string
    icon?: string | Component
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

export interface TeamPermissions {
    navMain: 'all' | string[]
    /**
     * 细粒度控制某个导航下的子项
     * 格式: { 导航id: [子项id数组] }
     */
    navItems?: Record<string, string[]>
}

export interface TeamItem {
    name: string
    logo: Component
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
}

// --- 菜单与顶部栏配置 ---

export interface MenuItem {
    type: 'text-button' | 'dropdown' | 'icon-button'
    label: string
    key?: string
    icon?: string
    url?: string
    options?: string[]
}

export interface MenuConfig {
    items: MenuItem[]
}

