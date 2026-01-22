import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Page1Config } from '@/types'

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
    }
})
