import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import {
    setNavGroupsRef,
    setPageConfigsRef,
    initNavigation,
} from '@/composables/useNavigation'
import type {
    NavGroup,
    NavMainItem,
    NavSubItem,
    Page1Config,
    FilterAreaConfig,
    FilterConfig,
    TableAreaConfig,
    TableColumn,
    ActionButtonConfig,
    ActionsAreaConfig,
    TreeNode,
    CardAreaConfig,
    CardItemConfig
} from '@/types'
import { supabase } from '@/api/supabase'
import { supabaseConfigService } from '@/api/supabase-config.service'
import { toast } from 'vue-sonner'
import { IconSettings } from '@arco-design/web-vue/es/icon'

export type {
    NavGroup,
    NavMainItem,
    NavSubItem,
    Page1Config,
    FilterAreaConfig,
    FilterConfig,
    TableAreaConfig,
    TableColumn,
    ActionButtonConfig,
    ActionsAreaConfig,
    TreeNode,
    CardAreaConfig,
    CardItemConfig,
    ExportData
}

const STORAGE_KEY_PAGE1_CONFIGS = 'shadcn_page1_configs'

interface ExportData {
    version: string
    exportedAt: string
    navGroups: Array<{
        label: string
        showLabel?: boolean
        items: Array<{
            id: string
            title: string
            url: string // 保持与 NavMainItem 一致
            icon?: any
            isOpen?: boolean
            items?: Array<{
                id: string
                title: string
                url?: string
                template?: string // V2: 支持模板标识
                component?: Omit<Page1Config, 'mockData'>
            }>
        }>
    }>
    pageConfigs: Record<string, Omit<Page1Config, 'mockData'>>
}

function savePage1ConfigsToStorage(configs: Record<string, Page1Config>) {
    try {
        localStorage.setItem(STORAGE_KEY_PAGE1_CONFIGS, JSON.stringify(configs))
    } catch (e) {
        console.warn('Failed to save page1Configs to localStorage:', e)
    }
}

function createDebouncedSync(delay = 1500) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let pendingPromise: Promise<void> | null = null
    let resolvePending: (() => void) | null = null

    const debouncedSave = (saveFn: () => Promise<any>): void => {
        // 清除之前的定时器
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(async () => {
            timeoutId = null
            pendingPromise = saveFn().finally(() => {
                pendingPromise = null
                if (resolvePending) {
                    resolvePending()
                    resolvePending = null
                }
            })
        }, delay)
    }

    const flush = (): Promise<void> => {
        return new Promise((resolve) => {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
            if (pendingPromise) {
                resolvePending = resolve
            } else {
                resolve()
            }
        })
    }

    const hasPending = () => timeoutId !== null || pendingPromise !== null

    return { debouncedSave, flush, hasPending }
}

export const useConfigStore = defineStore('config', () => {
    const navGroups = ref<NavGroup[]>([])
    const page1Configs = ref<Record<string, Page1Config>>({})
    const mockDataFunctions = ref<Record<string, () => any[]>>({})

    // 预览模式状态
    const previewMode = ref<'append' | 'override' | null>(null)
    const previewConfig = ref<Page1Config | null>(null)
    const previewNavId = ref('preview-temp-id')

    // 导航样式偏好: 'shadcn' | 'arco'
    const navigationStyle = ref<'shadcn' | 'arco'>('arco')
    // 筛选区与功能区融合设置
    const filterActionFusion = ref(false)

    // 加载状态
    const isConfigLoaded = ref(false)
    const isConfigLoading = ref(false)

    // 页面编辑模式 (用于 Page1 内嵌编辑)
    const isEditMode = ref(false)

    function setEditMode(enabled: boolean) {
        isEditMode.value = enabled
    }

    const isSyncing = ref(false)
    const lastSyncTime = ref<Date | null>(null)
    const syncError = ref<string | null>(null)

    // 创建防抖同步器 (500ms 无操作后自动同步)
    const { debouncedSave, flush: flushPendingSync, hasPending } = createDebouncedSync(500)

    // 监听配置变化，自动保存到 localStorage（仅在配置已加载后）
    watch(page1Configs, (newConfigs) => {
        if (isConfigLoaded.value) {
            savePage1ConfigsToStorage(newConfigs)
        }
    }, { deep: true })

    // 同步配置到导航系统（V2：分别同步结构和数据）
    watch([navGroups, page1Configs], () => {
        setNavGroupsRef(navGroups.value)
        setPageConfigsRef(page1Configs.value)
    }, { deep: true, immediate: true })

    watch(
        [navGroups, page1Configs],
        () => {
            // 仅在配置已加载后才自动同步（避免初始化时触发）
            if (!isConfigLoaded.value) return
            // 预览模式下不自动同步
            if (previewMode.value !== null) return

            syncError.value = null
            isSyncing.value = true

            debouncedSave(async () => {
                try {
                    const result = await saveToSupabaseInternal()
                    if (result.success) {
                        lastSyncTime.value = new Date()
                        syncError.value = null
                    } else {
                        syncError.value = result.message
                    }
                } catch (e) {
                    syncError.value = (e as Error).message
                } finally {
                    isSyncing.value = hasPending()
                }
            })
        },
        { deep: true }
    )

    /**
     * 确保所有待处理的同步操作完成
     * 用于页面关闭前或路由切换前调用
     */
    async function ensureSynced(): Promise<void> {
        await flushPendingSync()
    }

    // Getters
    const isInPreviewMode = computed(() => previewMode.value !== null)

    const effectiveNavGroups = computed(() => {
        if (!isInPreviewMode.value || !previewConfig.value) {
            return navGroups.value
        }

        const previewItem: NavMainItem = {
            id: 'preview-main',
            title: 'AI 预览',
            url: '#', // 添加必要的 url 属性
            isOpen: true,
            items: [{
                id: previewNavId.value,
                title: '预览页面',
                url: '#/preview',
                component: previewConfig.value
            }]
        }

        if (previewMode.value === 'override') {
            return [{
                label: '预览',
                items: [previewItem]
            }]
        } else {
            return [...navGroups.value, {
                label: 'AI 预览',
                showLabel: true,
                items: [previewItem]
            }]
        }
    })

    const getNavGroup = computed(() => (index: number) => effectiveNavGroups.value[index])

    const getPage1Config = computed(() => (navId: string): Page1Config | undefined => {
        // 优先检查预览模式
        if (isInPreviewMode.value && navId === previewNavId.value && previewConfig.value) {
            return {
                ...previewConfig.value,
                mockData: () => [] // 预览模式通常不需要 mock 数据或使用默认空数组
            }
        }

        const config = page1Configs.value[navId]
        if (config) {
            return {
                ...config,
                mockData: mockDataFunctions.value[navId] || (() => [])
            }
        }
        return undefined
    })

    // Set Navigation Style
    function setNavigationStyle(style: 'shadcn' | 'arco') {
        navigationStyle.value = style
        // Persist to local storage if needed, or just keep in session
        localStorage.setItem('shadcn_nav_style_pref', style)
    }

    // Set Filter Action Fusion
    function setFilterActionFusion(enable: boolean) {
        filterActionFusion.value = enable
        localStorage.setItem('shadcn_filter_action_fusion', String(enable))
    }

    // Init nav style from storage
    if (localStorage.getItem('shadcn_nav_style_pref')) {
        navigationStyle.value = localStorage.getItem('shadcn_nav_style_pref') as 'shadcn' | 'arco'
    }

    // Init fusion setting from storage
    if (localStorage.getItem('shadcn_filter_action_fusion')) {
        filterActionFusion.value = localStorage.getItem('shadcn_filter_action_fusion') === 'true'
    }

    // Preview Actions
    function setPreviewConfig(config: Page1Config, mode: 'append' | 'override' = 'override') {
        previewConfig.value = config
        previewMode.value = mode
        // 如果是 override 模式，可能需要重定向到预览页面
    }

    function clearPreviewConfig() {
        previewMode.value = null
        previewConfig.value = null
    }

    function applyPreviewConfig() {
        // TODO: 实现根据预览配置更新实际配置的逻辑
        // 这可能需要一个新的 actions 支持，或者只是提示用户
        console.log('Applying preview config is not fully implemented yet')
    }

    function addNavMainItem(groupIndex: number, item: Omit<NavMainItem, 'id'>): string | null {
        const group = navGroups.value[groupIndex]
        if (group) {
            const newId = `nav-${Date.now()}`
            group.items.push({
                ...item,
                id: newId,
                icon: item.icon || IconSettings,
                items: []
            })
            // console.log('Action: addNavMainItem', { newId, navGroupsLen: navGroups.value.length })
            return newId
        }
        return null
    }

    function updateNavMainItem(groupIndex: number, itemId: string, updates: Partial<NavMainItem>) {
        const group = navGroups.value[groupIndex]
        if (group) {
            const item = group.items.find(i => i.id === itemId)
            if (item) {
                Object.assign(item, updates)
                // console.log('Action: updateNavMainItem', { itemId, updates })
            }
        }
    }

    function deleteNavMainItem(groupIndex: number, itemId: string) {
        const group = navGroups.value[groupIndex]
        if (group) {
            const index = group.items.findIndex(i => i.id === itemId)
            if (index > -1) {
                group.items.splice(index, 1)
                // console.log('Action: deleteNavMainItem', { itemId })
            }
        }
    }

    function addSubNavItem(groupIndex: number, mainItemId: string, item: Omit<NavSubItem, 'id'>): string | null {
        const group = navGroups.value[groupIndex]
        if (group) {
            const mainItem = group.items.find(i => i.id === mainItemId)
            if (mainItem) {
                if (!mainItem.items) mainItem.items = []
                const newId = `sub-${Date.now()}`
                // V2: 创建子项时不带 component
                mainItem.items.push({ ...item, id: newId })
                return newId
            }
        }
        return null
    }

    function updateSubNavItem(groupIndex: number, mainItemId: string, subItemId: string, updates: Partial<NavSubItem>) {
        const group = navGroups.value[groupIndex]
        if (group) {
            const mainItem = group.items.find(i => i.id === mainItemId)
            if (mainItem?.items) {
                const subItem = mainItem.items.find(s => s.id === subItemId)
                if (subItem) {
                    Object.assign(subItem, updates)
                    // console.log('Action: updateSubNavItem', { subItemId, updates })
                }
            }
        }
    }

    function deleteSubNavItem(groupIndex: number, mainItemId: string, subItemId: string) {
        const group = navGroups.value[groupIndex]
        if (group) {
            const mainItem = group.items.find(i => i.id === mainItemId)
            if (mainItem?.items) {
                const index = mainItem.items.findIndex(s => s.id === subItemId)
                if (index > -1) {
                    mainItem.items.splice(index, 1)
                    // console.log('Action: deleteSubNavItem', { subItemId })
                }
            }
        }
    }

    function reorderSubNavItems(groupIndex: number, mainItemId: string, newItems: NavSubItem[]) {
        const group = navGroups.value[groupIndex]
        if (group) {
            const mainItem = group.items.find(i => i.id === mainItemId)
            if (mainItem) {
                mainItem.items = newItems
            }
        }
    }

    function addPage1Config(navId: string, config: Omit<Page1Config, 'mockData'>) {
        page1Configs.value[navId] = config as Page1Config
        mockDataFunctions.value[navId] = () => []

        // V2: 不再将 component 同步到 navGroups 树中
    }

    function updatePage1Config(navId: string, updates: Partial<Page1Config>) {
        if (page1Configs.value[navId]) {
            Object.assign(page1Configs.value[navId], updates)
        }
    }

    function deletePage1Config(navId: string) {
        delete page1Configs.value[navId]
        delete mockDataFunctions.value[navId]

        // V2: 只需从 page1Configs 中删除
    }

    function updateFilterAreaConfig(navId: string, updates: Partial<FilterAreaConfig>) {
        if (page1Configs.value[navId]) {
            Object.assign(page1Configs.value[navId].filterArea, updates)
        }
    }

    function updateTableAreaConfig(navId: string, updates: Partial<TableAreaConfig>) {
        if (page1Configs.value[navId]) {
            Object.assign(page1Configs.value[navId].tableArea, updates)
        }
    }

    function resetToDefaults() {
        navGroups.value = []
        page1Configs.value = {}
        mockDataFunctions.value = {}
        isConfigLoaded.value = false
        localStorage.removeItem(STORAGE_KEY_PAGE1_CONFIGS)
    }

    function getTemplateConfig(): ExportData {
        const exampleComponentConfig: Omit<Page1Config, 'mockData'> = {
            filterArea: {
                columns: 4,
                gap: '16px',
                filters: [
                    { key: 'keyword', type: 'input', label: '关键词', placeholder: '请输入关键词', defaultValue: '' },
                    { key: 'status', type: 'select', label: '状态', defaultValue: '全部', options: ['全部', '待审核', '已通过', '已拒绝'] }
                ]
            },
            actionsArea: {
                show: true,
                buttons: [
                    { key: 'search', label: '查询', variant: 'outline' },
                    { key: 'reset', label: '重置', variant: 'outline' }
                ]
            },
            cardArea: {
                show: false,
                columns: 4,
                gap: '16px',
                cards: []
            },
            tableArea: {
                height: '500px',
                scrollX: true,
                scrollY: true,
                showCheckbox: true,
                fixedLayout: true,
                columns: [
                    { key: 'id', label: 'ID', width: '80px' },
                    { key: 'name', label: '名称', width: '150px' }
                ]
            }
        }

        return {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            navGroups: [
                {
                    label: '平台',
                    showLabel: false,
                    items: [
                        {
                            id: 'example-main',
                            title: '示例主导航',
                            url: '',
                            icon: 'IconSettings',
                            isOpen: true,
                            items: [
                                {
                                    id: 'example-1',
                                    title: '示例页面1',
                                    url: '#',
                                    component: exampleComponentConfig
                                }
                            ]
                        }
                    ]
                }
            ],
            pageConfigs: {}
        }
    }

    function exportFullConfig(): ExportData {
        const exportNavGroups = navGroups.value.map(group => ({
            label: group.label,
            showLabel: group.showLabel,
            items: group.items.map(mainItem => ({
                id: mainItem.id,
                title: mainItem.title,
                url: mainItem.url || '#', // 修复 lint: 确保 url 存在
                icon: mainItem.icon,
                isOpen: mainItem.isOpen,
                items: mainItem.items?.map(subItem => {
                    const pageConfig = page1Configs.value[subItem.id]
                    let componentConfig: Omit<Page1Config, 'mockData'> | undefined

                    if (pageConfig) {
                        const { mockData, ...rest } = pageConfig
                        componentConfig = {
                            ...rest,
                            ...(rest.topBar && { topBar: rest.topBar }),
                            filterArea: rest.filterArea,
                            ...(rest.actionsArea && { actionsArea: rest.actionsArea }),
                            ...(rest.cardArea && { cardArea: rest.cardArea }),
                            tableArea: rest.tableArea,
                        }
                    }

                    return {
                        id: subItem.id,
                        title: subItem.title,
                        url: subItem.url,
                        component: componentConfig
                    }
                })
            }))
        }))

        return {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            navGroups: exportNavGroups,
            pageConfigs: {}
        }
    }

    function importFullConfig(data: ExportData | NavGroup[]): { success: boolean; message: string } {
        try {
            if (!data) return { success: false, message: '无效的配置数据' }

            let navGroupsData: NavGroup[] = []

            // 兼容性识别：是 ExportData 包装格式还是纯数组格式
            if (Array.isArray(data)) {
                navGroupsData = data
            } else if (data.navGroups && Array.isArray(data.navGroups)) {
                navGroupsData = data.navGroups

                // 如果是包装格式，顺便处理一下里面嵌套的 pageConfigs (向下兼容)
                if (data.pageConfigs) {
                    Object.entries(data.pageConfigs).forEach(([navId, config]: [string, any]) => {
                        page1Configs.value[navId] = {
                            ...config,
                            mockData: mockDataFunctions.value[navId] || (() => [])
                        } as Page1Config
                    })
                }
            }

            if (navGroupsData.length > 0) {
                console.log('importFullConfig: Found', navGroupsData.length, 'groups to import')
                navGroups.value = []
                navGroupsData.forEach((importGroup: any) => {
                    const items = importGroup.items || []
                    console.log(' - Group:', importGroup.label, 'Items:', items.length)

                    navGroups.value.push({
                        label: importGroup.label,
                        // ... (rest of the mapping code)
                        showLabel: importGroup.showLabel,
                        items: items.map((mainItem: any) => {
                            const subItems = mainItem.items || []

                            return {
                                id: mainItem.id,
                                title: mainItem.title,
                                icon: mainItem.icon || 'IconSettings',
                                url: mainItem.url || '#',
                                isOpen: mainItem.isOpen,
                                items: subItems.map((sub: any) => {
                                    // 检查是否带有内嵌组件配置
                                    if (sub.component) {
                                        page1Configs.value[sub.id] = {
                                            ...sub.component,
                                            mockData: mockDataFunctions.value[sub.id] || (() => [])
                                        } as Page1Config
                                    }

                                    return {
                                        id: sub.id,
                                        title: sub.title,
                                        url: sub.url || '#',
                                        template: sub.template || (sub.component ? 'Page1' : undefined)
                                    }
                                })
                            }
                        }) || []
                    })
                })
                console.log('importFullConfig: Import complete. navGroups length:', navGroups.value.length)
            } else {
                console.warn('importFullConfig: Data array is empty')
            }

            return { success: true, message: '配置导入成功' }

            return { success: true, message: '配置导入成功' }
        } catch (e) {
            console.error('Failed to import config:', e)
            return { success: false, message: '导入失败: ' + (e as Error).message }
        }
    }

    async function saveToSupabaseInternal(): Promise<{ success: boolean; message: string }> {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                return { success: false, message: '用户未登录' }
            }

            const errors: string[] = []
            const navData = exportFullConfig()
            navData.pageConfigs = {}

            // 1. 保存导航配置
            const { success: navSuccess, error: navError } = await supabaseConfigService.saveNavigation(navData.navGroups)

            if (!navSuccess) {
                console.error('保存导航配置失败:', navError)
                errors.push(`导航: ${navError}`)
            }

            // 2. 保存每个页面配置
            for (const [navId, config] of Object.entries(page1Configs.value)) {
                const { mockData, ...configData } = config
                const { success: pageSuccess, error: pageError } = await supabaseConfigService.savePageConfig(navId, configData)

                if (!pageSuccess) {
                    console.error(`保存页面 ${navId} 失败:`, pageError)
                    errors.push(`页面 ${navId}: ${pageError}`)
                }
            }

            if (errors.length > 0) {
                return { success: false, message: errors.join('; ') }
            }

            return { success: true, message: '配置已保存到云端' }
        } catch (e) {
            console.error('Failed to save to Supabase:', e)
            return { success: false, message: '保存失败: ' + (e as Error).message }
        }
    }

    /**
     * 保存配置到 Supabase (公开版本，显示 Toast 通知)
     */
    async function saveToSupabase(): Promise<{ success: boolean; message: string }> {
        const result = await saveToSupabaseInternal()
        if (result.success) {
            toast.success('配置已保存到云端')
        } else {
            toast.error('保存失败', { description: result.message })
        }
        return result
    }

    /**
     * 从 Supabase 加载配置
     * 使用分类存储：分别加载 navigation 和 page 配置
     */
    async function loadFromSupabase(): Promise<{ success: boolean; message: string }> {
        isConfigLoading.value = true
        try {
            // 获取当前用户
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                toast.error('未登录', { description: '请先登录后再加载配置' })
                isConfigLoading.value = false
                return { success: false, message: '用户未登录' }
            }



            // ==========================================
            // 优化：使用 supabaseConfigService 加载所有配置
            // ==========================================
            await supabaseConfigService.init()

            const [navResult, pagesResult] = await Promise.all([
                supabaseConfigService.loadNavigation(),
                supabaseConfigService.loadAllPageConfigs()
            ])

            if (navResult.error) {
                console.error('Failed to load navigation config:', navResult.error)
            }

            if (pagesResult.error) {
                console.error('Failed to load page configs:', pagesResult.error)
            }

            // 先清除 localStorage，确保使用云端数据
            localStorage.removeItem(STORAGE_KEY_PAGE1_CONFIGS)

            // 1. 处理导航配置
            let hasValidConfig = false
            let hasCloudData = !!navResult.data

            if (hasCloudData) {
                const result = importFullConfig(navResult.data as any)
                if (result.success && navGroups.value.length > 0) {
                    hasValidConfig = true
                } else {
                    console.error('云端存在配置但解析失败，跳过初始化以保护数据')
                }
            }

            // 2. 处理页面配置
            let hasPageConfig = false
            if (pagesResult.data && Object.keys(pagesResult.data).length > 0) {
                hasPageConfig = true
                for (const [navId, content] of Object.entries(pagesResult.data)) {
                    if (content) {
                        page1Configs.value[navId] = {
                            ...content,
                            mockData: mockDataFunctions.value[navId] || (() => [])
                        } as Page1Config
                    }
                }
            }

            // 逻辑优化：只有在真正没有任何配置的情况下，才进行初始化并保存
            // 如果是有数据但解析失败，绝对不能覆盖！
            if (!hasValidConfig) {
                if (hasCloudData) {
                    // 情况A：云端有数据，但解析失败。
                    // 策略：加载默认模板到内存供展示，但不保存回云端，避免覆盖用户数据。
                    console.error('云端配置格式异常，加载默认模板用于应急展示 (不会保存)')
                    const template = getTemplateConfig()
                    // 仅在内存中恢复，以此让用户至少能看到界面
                    importFullConfig(template as any)

                    isConfigLoaded.value = true
                    isConfigLoading.value = false
                    toast.error('云端配置格式异常，已加载临时默认界面', { description: '您的原始数据未被修改，请联系管理员修复。' })
                    return { success: false, message: '云端配置解析失败，已加载临时模板' }
                }

                // 情况B：用户完全没有配置 (hasCloudData === false)
                // 策略：初始化默认配置并保存
                console.log('用户没有有效的云端导航配置，尝试初始化')
                const template = getTemplateConfig()

                if (hasPageConfig) {
                    console.log('检测到现有页面配置，仅恢复导航结构')
                    const recoveryConfig = {
                        ...template,
                        pageConfigs: {}
                    }
                    importFullConfig(recoveryConfig as any)
                } else {
                    console.log('初始化完整默认模板')
                    importFullConfig(template as any)
                }

                await saveToSupabase()
                isConfigLoaded.value = true
                isConfigLoading.value = false
                const msg = hasPageConfig ? '已恢复导航结构 (保留页面配置)' : '已初始化默认配置'
                toast.success(msg)
                return { success: true, message: msg }
            }

            // 将云端配置同步到 localStorage
            savePage1ConfigsToStorage(page1Configs.value)

            // 初始化导航状态
            if (navGroups.value.length > 0) {
                initNavigation(navGroups.value)
            }

            isConfigLoaded.value = true
            isConfigLoading.value = false
            return { success: true, message: '配置加载成功' }
        } catch (e) {
            console.error('Failed to load from Supabase:', e)
            isConfigLoading.value = false
            return { success: false, message: '加载失败: ' + (e as Error).message }
        }
    }

    /**
     * 导入 JSON 配置并同步到云端
     */
    async function importAndSyncToCloud(data: ExportData): Promise<{ success: boolean; message: string }> {
        // 先导入到本地
        const importResult = importFullConfig(data)
        if (!importResult.success) {
            return importResult
        }

        // 再同步到云端
        const saveResult = await saveToSupabase()
        if (!saveResult.success) {
            return { success: false, message: `导入成功但同步失败: ${saveResult.message}` }
        }

        return { success: true, message: '配置导入并同步成功' }
    }

    return {
        // State
        navGroups,
        page1Configs,
        // Style State
        navigationStyle,
        // Filter State
        filterActionFusion,
        // Preview State
        previewMode,
        previewConfig,
        // 加载状态
        isConfigLoaded,
        isConfigLoading,
        // Getters
        isInPreviewMode,
        effectiveNavGroups,
        getNavGroup,
        getPage1Config,
        // Style Actions
        setNavigationStyle,
        // Filter Actions
        setFilterActionFusion,
        // Preview Actions
        setPreviewConfig,
        clearPreviewConfig,
        applyPreviewConfig,
        // Nav Actions
        addNavMainItem,
        updateNavMainItem,
        deleteNavMainItem,
        addSubNavItem,
        updateSubNavItem,
        deleteSubNavItem,
        reorderSubNavItems,
        // Page1 Actions
        addPage1Config,
        updatePage1Config,
        deletePage1Config,
        updateFilterAreaConfig,
        updateTableAreaConfig,
        // Persistence Actions
        resetToDefaults,

        // Import/Export Actions
        exportFullConfig,
        importFullConfig,
        // Supabase Actions
        saveToSupabase,
        loadFromSupabase,
        importAndSyncToCloud,
        // Auto-sync State
        isSyncing,
        lastSyncTime,
        syncError,
        ensureSynced,
        // Edit Mode
        isEditMode,
        setEditMode,
    }
})

