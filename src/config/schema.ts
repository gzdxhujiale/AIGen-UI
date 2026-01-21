import { h } from 'vue'

// 导入类型用于本文件
import type { SidebarConfig } from '@/types'

// ============================================
// Logo 组件（渲染函数版本）
// ============================================
const AIGenLogo = (props: any) => h('img', {
    src: import.meta.env.BASE_URL + 'ai.svg',
    ...props,
    style: 'width: 100%; height: 100%; object-fit: contain;'
})

// ============================================
// 默认配置数据（精简版 - 配置从云端加载）
// ============================================
export const defaultSidebarConfig: SidebarConfig = {
    user: { name: '', email: '', avatar: '' },
    teams: [{
        name: 'AIGen UI',
        logo: AIGenLogo,
        plan: 'online',
        permissions: { navMain: 'all', projects: 'all' }
    }],
    navGroups: [],
    projectGroups: [],
}

/** 合并用户配置与默认配置 */
export function mergeSidebarConfig(customConfig: Partial<SidebarConfig>): SidebarConfig {
    return {
        ...defaultSidebarConfig,
        ...customConfig,
        navGroups: customConfig.navGroups ?? defaultSidebarConfig.navGroups,
        projectGroups: customConfig.projectGroups ?? defaultSidebarConfig.projectGroups,
        teams: customConfig.teams ?? defaultSidebarConfig.teams,
    }
}

