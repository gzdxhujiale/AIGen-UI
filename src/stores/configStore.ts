import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Page1Config } from '@/types'
import { useConfigPageStore } from './config_page_Store'
import { useConfigTeamStore } from './config_team_Store'

export const useConfigStore = defineStore('config', () => {
    // 预览模式状态
    const previewMode = ref<'append' | 'override' | null>(null)
    const previewConfig = ref<Page1Config | null>(null)
    // const previewNavId = ref('preview-temp-id')

    // 导航样式偏好: 'shadcn' | 'arco'
    const navigationStyle = ref<'shadcn' | 'arco'>('arco')
    // 筛选区与功能区融合设置
    const filterActionFusion = ref(true)

    // 默认项目分组配置 (暂时保留，后续也可迁移)
    const projectGroups = ref<any[]>([])

    // 页面编辑模式 (用于 Page1 内嵌编辑)
    const isEditMode = ref(false)

    function setEditMode(enabled: boolean) {
        isEditMode.value = enabled
    }

    // ============================================
    // 计算属性 (Getters)
    // ============================================
    const isInPreviewMode = computed(() => previewMode.value !== null)

    // 设置导航样式
    function setNavigationStyle(style: 'shadcn' | 'arco') {
        navigationStyle.value = style
        localStorage.setItem('shadcn_nav_style_pref', style)
    }

    // 设置筛选区与功能区融合
    function setFilterActionFusion(enable: boolean) {
        filterActionFusion.value = enable
        localStorage.setItem('shadcn_filter_action_fusion', String(enable))
    }

    // 从本地存储初始化导航样式
    if (localStorage.getItem('shadcn_nav_style_pref')) {
        navigationStyle.value = localStorage.getItem('shadcn_nav_style_pref') as 'shadcn' | 'arco'
    }

    // 从本地存储初始化融合设置
    if (localStorage.getItem('shadcn_filter_action_fusion')) {
        filterActionFusion.value = localStorage.getItem('shadcn_filter_action_fusion') === 'true'
    }

    // 预览相关操作
    function setPreviewConfig(config: Page1Config, mode: 'append' | 'override' = 'override') {
        previewConfig.value = config
        previewMode.value = mode
    }

    function clearPreviewConfig() {
        previewMode.value = null
        previewConfig.value = null
    }

    function applyPreviewConfig() {
        console.log('Applying preview config is not fully implemented yet')
    }

    function setProjectGroups(groups: any[]) {
        projectGroups.value = groups
    }

    function updateProjectGroup(index: number, updates: any) {
        if (projectGroups.value[index]) {
            Object.assign(projectGroups.value[index], updates)
        }
    }

    // ============================================
    // 完整配置导入导出 (AI 接口桥接)
    // ============================================

    /**
     * 导出完整配置给 AI 或 备份
     */
    function exportFullConfig() {
        const pageStore = useConfigPageStore()

        // 构造 AI 期望的格式
        const pageConfigs: Record<string, any> = {}
        const navGroups = pageStore.navGroups

        // 将 Map 中的所有组件配置打平导出
        pageStore.pageConfigs.forEach(record => {
            record.page_config.items.forEach(item => {
                if (item.component) {
                    pageConfigs[item.id] = item.component
                }
            })
        })

        return {
            navGroups,
            pageConfigs,
            version: '2.0-v9',
            metadata: {
                navigationStyle: navigationStyle.value,
                filterActionFusion: filterActionFusion.value
            }
        }
    }

    /**
     * 从 AI 或 备份导入完整配置
     */
    function importFullConfig(config: any) {
        if (!config) return { success: false, message: '配置对象为空' }

        try {
            const pageStore = useConfigPageStore()

            // 情况 1: 包含 navGroups 的完整 V9 架构
            if (config.navGroups && Array.isArray(config.navGroups)) {
                // 如果是覆盖模式，通常我们希望转换并保存到 page_configs 表
                // 这里的逻辑需要根据业务决定是覆盖所有还是增量合并
                // 为简单起见，我们将 AI 的 navGroups 转换为 PageConfigRecord 列表
                const records: any[] = []

                config.navGroups.forEach((group: any) => {
                    group.items?.forEach((mainItem: any) => {
                        // 构造 PageConfigRecord
                        const record = {
                            title: mainItem.title || mainItem.id,
                            page_config: {
                                title: mainItem.title || mainItem.id,
                                icon: mainItem.icon || 'IconSettings',
                                isOpen: mainItem.isOpen !== false,
                                items: mainItem.items?.map((sub: any) => ({
                                    id: sub.id,
                                    name: sub.title || sub.name,
                                    component: sub.component || (config.pageConfigs ? config.pageConfigs[sub.id] : null)
                                })) || []
                            }
                        }
                        records.push(record)
                    })
                })

                // 这里我们暂不直接调用 saveAllPageConfigs，因为确认权在 confirmPreview
                // 但 aiStore 需要一个返回 success 的结果
                // 实际的数据变更应该通过 store 的状态体现
                // 为了让 UI 实时预览，我们需要更新本地状态
                records.forEach(r => {
                    pageStore.pageConfigs.set(r.title, r)
                })
            }
            // 情况 2: 只是单个页面的 component 配置 (AI 有时只返回部分)
            else if (config.filterArea || config.tableArea) {
                // 如果有活动的页面，可以考虑应用到活动页面，或者作为预览处理
                // aiStore 里的 handleResponse 已经处理了 setPreviewConfig
            }

            return { success: true }
        } catch (error: any) {
            console.error('导入配置失败:', error)
            return { success: false, message: error.message }
        }
    }

    /**
     * 同步所有配置到 Supabase
     */
    async function saveToSupabase() {
        const teamStore = useConfigTeamStore()
        const pageStore = useConfigPageStore()
        // const menuStore = useConfigMenuStore() // V9 中 menu 逻辑已合并到 pageStore

        try {
            // 这里可以并行执行所有 store 的保存
            const results = await Promise.all([
                teamStore.saveTeams(),
                pageStore.saveAllPageConfigs(Array.from(pageStore.pageConfigs.values()))
            ])

            const failed = results.find(r => !r.success)
            if (failed) {
                throw new Error(failed.message)
            }

            return { success: true }
        } catch (error: any) {
            console.error('全量同步失败:', error)
            return { success: false, message: error.message }
        }
    }

    return {
        // 样式状态
        navigationStyle,
        // 筛选器状态
        filterActionFusion,
        // 预览状态
        previewMode,
        previewConfig,
        // 项目分组状态
        projectGroups,
        // 编辑模式
        isEditMode,

        // 计算属性
        isInPreviewMode,

        // 操作方法
        setEditMode,
        setNavigationStyle,
        setFilterActionFusion,
        setPreviewConfig,
        clearPreviewConfig,
        applyPreviewConfig,
        setProjectGroups,
        updateProjectGroup,
        exportFullConfig,
        importFullConfig,
        saveToSupabase,
    }
})
