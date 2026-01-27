import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Page1Config } from '@/types'
import { useConfigPageStore } from './config_page_Store'
import { useConfigTeamStore } from './config_team_Store'

export const useConfigStore = defineStore('config', () => {
    const pageStore = useConfigPageStore()
    const teamStore = useConfigTeamStore()

    // --- 全局偏好设置 (自动持久化) ---
    const navigationStyle = ref<'shadcn' | 'arco'>(
        (localStorage.getItem('shadcn_nav_style_pref') as 'shadcn' | 'arco') || 'arco'
    )
    const filterActionFusion = ref(
        localStorage.getItem('shadcn_filter_action_fusion') !== 'false' // 默认为 true
    )
    const isEditMode = ref(false)

    watch(navigationStyle, (val) => localStorage.setItem('shadcn_nav_style_pref', val))
    watch(filterActionFusion, (val) => localStorage.setItem('shadcn_filter_action_fusion', String(val)))

    // --- 预览模式状态 ---
    const previewMode = ref<'append' | 'override' | null>(null)
    const previewConfig = ref<Page1Config | null>(null)
    const previewNavGroups = ref<any[] | null>(null)
    const isInPreviewMode = computed(() => previewMode.value !== null)

    // --- 临时/项目状态 ---
    const projectGroups = ref<any[]>([])

    // ============================================
    // 基本操作
    // ============================================

    const setEditMode = (enabled: boolean) => { isEditMode.value = enabled }
    const setNavigationStyle = (style: 'shadcn' | 'arco') => { navigationStyle.value = style }
    const setFilterActionFusion = (enable: boolean) => { filterActionFusion.value = enable }

    const setPreviewConfig = (config: Page1Config, mode: 'append' | 'override' = 'override') => {
        previewConfig.value = config
        previewMode.value = mode
    }
    const setPreviewNav = (groups: any[]) => { previewNavGroups.value = groups }
    const clearPreviewConfig = () => {
        previewMode.value = null
        previewConfig.value = null
        previewNavGroups.value = null
    }

    // ============================================
    // 完整配置导入导出 (AI/备份桥接)
    // ============================================

    function exportFullConfig() {
        // 打平所有二级页面的组件配置
        const pageConfigs: Record<string, any> = {}
        pageStore.pageConfigs.forEach(r =>
            r.page_config.items.forEach(i => i.component && (pageConfigs[i.id] = i.component))
        )

        return {
            navGroups: pageStore.navGroups,
            pageConfigs,
            version: '2.1-v9',
            metadata: {
                navigationStyle: navigationStyle.value,
                filterActionFusion: filterActionFusion.value
            }
        }
    }

    function importFullConfig(config: any) {
        if (!config?.navGroups) return { success: false, message: '无效配置' }
        try {
            config.navGroups.flatMap((g: any) => g.items || []).forEach((main: any) => {
                pageStore.pageConfigs.set(main.title, {
                    title: main.title,
                    page_config: {
                        title: main.title,
                        icon: main.icon || 'IconSettings',
                        isOpen: main.isOpen !== false,
                        items: main.items?.map((sub: any) => ({
                            id: sub.id,
                            name: sub.name,
                            component: sub.component || config.pageConfigs?.[sub.id]
                        })) || []
                    }
                })
            })
            return { success: true }
        } catch (e: any) {
            return { success: false, message: e.message }
        }
    }

    async function saveToSupabase() {
        try {
            const [r1, r2] = await Promise.all([
                teamStore.saveTeams(),
                pageStore.saveAllPageConfigs(Array.from(pageStore.pageConfigs.values()))
            ])
            if (!r1.success || !r2.success) throw new Error(r1.message || r2.message)
            return { success: true }
        } catch (e: any) {
            return { success: false, message: e.message }
        }
    }

    return {
        navigationStyle, filterActionFusion, isEditMode,
        previewMode, previewConfig, previewNavGroups, isInPreviewMode, projectGroups,
        setEditMode, setNavigationStyle, setFilterActionFusion,
        setPreviewConfig, setPreviewNav, clearPreviewConfig,
        exportFullConfig, importFullConfig, saveToSupabase,
    }
})
