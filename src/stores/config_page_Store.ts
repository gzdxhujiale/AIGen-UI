import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchApi } from '@/api/request'
import { toast } from 'vue-sonner'
import type {
    Page1ConfigData,
    FilterAreaConfig,
    FilterConfig,
    TableAreaConfig,
    TableColumn,
    ActionsAreaConfig,
    ActionButtonConfig,
    CardAreaConfig,
    CardItemConfig,
    FormPageConfig
} from '@/types/page-config'
import type { NavGroup, NavMainItem } from '@/types/navigation'
import {
    setNavGroupsRef,
    initNavigation,
} from '@/composables/useNavigation'
import { watch } from 'vue'

// ============================================
// 类型定义
// ============================================

/**
 * V9 架构：一级导航配置记录
 * 对应 page_configs 表的一行数据
 */
export interface PageConfigRecord {
    id?: string              // UUID 主键
    user_id?: string         // 用户 ID
    title: string            // 一级导航名称 (唯一标识)
    page_config: PageConfigContent  // 页面配置 JSONB
    created_at?: string
    updated_at?: string
}

/**
 * page_config JSONB 字段的结构
 * 包含一级导航的元信息和所有二级导航项
 */
export interface PageConfigContent {
    title: string            // 一级导航标题
    icon?: string            // 图标
    isOpen?: boolean         // 是否默认展开
    visible?: boolean        // 是否可见
    items: PageSubItem[]     // 二级导航项列表
}

/**
 * 二级导航项配置
 */
export interface PageSubItem {
    id: string               // 二级导航 ID
    name: string             // 二级导航名称
    pageType?: 'list' | 'form'  // 页面类型，默认 'list'
    component?: Page1ConfigData  // list 类型页面使用
    formConfig?: FormPageConfig  // form 类型页面使用
}

/**
 * 默认的一级导航配置模板 (用于新建)
 */
const DEFAULT_PAGE_CONFIG_CONTENT: PageConfigContent = {
    title: '默认导航',
    icon: 'IconSettings',
    isOpen: true,
    visible: true,
    items: []
}

/**
 * 默认的页面配置记录 (新用户初始化时自动创建)
 * 纯净版 V9 默认值
 */
const DEFAULT_PAGE_CONFIG_RECORD: PageConfigContent = {
    title: '一级测试导航栏',
    icon: 'IconSettings',
    isOpen: true,
    visible: true,
    items: [
        {
            id: '1',
            name: 'test',
            component: {
                filterArea: { columns: 4, gap: '16px', filters: [] },
                tableArea: { height: '500px', columns: [], scrollX: true, scrollY: true, showCheckbox: true }
            }
        }
    ]
}

/**
 * 默认的页面组件配置
 */
const DEFAULT_PAGE_COMPONENT: Page1ConfigData = {
    filterArea: {
        columns: 4,
        gap: '16px',
        filters: []
    },
    tableArea: {
        height: '500px',
        scrollX: true,
        scrollY: true,
        showCheckbox: true,
        fixedLayout: true,
        columns: []
    }
}



// ============================================
// Store 定义
// ============================================

export const useConfigPageStore = defineStore('config-page', () => {
    /**
     * 所有页面配置记录 (按一级导航聚合)
     * key: title (一级导航名称)
     */
    const pageConfigs = ref<Map<string, PageConfigRecord>>(new Map())
    const isLoaded = ref(false)
    const isLoading = ref(false)

    // 预览层 (不会持久化，仅用于 UI 展示)
    const previewPageConfigs = ref<Map<string, PageConfigRecord>>(new Map())

    // 同步状态
    const isSyncing = ref(false)
    const lastSyncTime = ref<Date | null>(null)
    const syncError = ref<string | null>(null)
    const CACHE_KEY = 'aigen_page_config_cache'

    // ============================================
    // 内部助手 (简化逻辑)
    // ============================================

    /**
     * 获取组件上下文：返回一级记录、二级项和确保初始化的组件配置
     */
    function _getCompContext(navTitle: string, subId: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) throw new Error(`一级导航 "${navTitle}" 不存在`)
        const item = record.page_config.items.find(i => i.id === subId)
        if (!item) throw new Error(`二级导航 "${subId}" 不存在`)
        if (!item.component) item.component = { ...DEFAULT_PAGE_COMPONENT }
        return { record, item, component: item.component }
    }

    /**
     * 统一的组件修改器
     * @param mutationFn 修改逻辑。若返回 false 则终止保存。
     */
    async function _mutateComp(navTitle: string, subId: string, mutationFn: (c: Page1ConfigData) => void | boolean) {
        try {
            const { record, component } = _getCompContext(navTitle, subId)
            if (mutationFn(component) === false) return { success: false, message: '操作目标不存在' }
            return await savePageConfig(navTitle, record.page_config)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            return { success: false, message: msg }
        }
    }

    /**
     * 从本地缓存加载 (同步)
     */
    function loadFromCache() {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            try {
                const arr = JSON.parse(cached) as PageConfigRecord[]
                pageConfigs.value.clear()
                arr.forEach(record => {
                    pageConfigs.value.set(record.title, record)
                })
                isLoaded.value = true
                console.log('Page config loaded from cache', pageConfigs.value.size)
            } catch (e) {
                console.error('Failed to parse page config cache', e)
            }
        }
    }

    /**
     * 更新缓存 (私有)
     */
    function updateCache() {
        try {
            const arr = Array.from(pageConfigs.value.values())
            localStorage.setItem(CACHE_KEY, JSON.stringify(arr))
        } catch (e) {
            console.error('Failed to update page config cache', e)
        }
    }

    // ============================================
    // Computed
    // ============================================

    /**
     * 获取所有页面配置的数组形式 (合并了预览数据)
     */
    const pageConfigList = computed(() => {
        // 创建合并后的 Map
        const mergedMap = new Map(pageConfigs.value)

        // 覆盖/合并预览数据
        previewPageConfigs.value.forEach((record, title) => {
            mergedMap.set(title, record)
        })

        return Array.from(mergedMap.values())
    })

    /**
     * 适配 layouts 的导航组结构 (将所有一级导航聚合到一个默认组)
     */
    const navGroups = computed<NavGroup[]>(() => {
        const mainItems: NavMainItem[] = pageConfigList.value
            .filter(record => record && record.page_config) // 安全过滤
            .map(record => ({
                id: record.title,
                title: record.title,
                icon: record.page_config?.icon || 'IconSettings',
                isOpen: record.page_config?.isOpen,
                visible: record.page_config?.visible ?? true,
                items: (record.page_config?.items || []).map(sub => ({
                    id: sub.id,
                    name: sub.name,
                    url: '#',
                    pageType: sub.pageType,
                    component: sub.component,
                    formConfig: sub.formConfig,
                }))
            }))

        return [{
            label: 'Application',
            showLabel: false,
            items: mainItems
        }]
    })

    // ============================================
    // 加载方法
    // ============================================

    /**
     * 加载所有页面配置
     */
    async function loadPageConfigs() {
        isLoading.value = true
        try {
            /* Auth handled by fetchApi */
            const { data, error } = await fetchApi('/configs/pages').catch(e => ({ error: e, data: null }))
            if (error) throw error

            // 清空并重新填充
            if (data && data.length > 0) {
                const newMap = new Map<string, PageConfigRecord>()
                data.forEach((record: PageConfigRecord) => {
                    newMap.set(record.title, record)
                })
                pageConfigs.value = newMap
                // 更新缓存
                updateCache()
            } else {
                // 如果云端没数据，自动创建默认配置 (与 menu/team store 逻辑一致)
                const defaultTitle = DEFAULT_PAGE_CONFIG_RECORD.title
                await savePageConfig(defaultTitle, DEFAULT_PAGE_CONFIG_RECORD)
            }
            isLoaded.value = true
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('加载页面配置失败:', error)
            toast.error('加载页面配置失败: ' + msg)
            return { success: false, message: msg }
        } finally {
            isLoading.value = false
        }
    }

    // ============================================
    // 查询方法
    // ============================================

    /**
     * 根据一级导航标题获取配置
     */
    function getPageConfigByTitle(title: string): PageConfigRecord | undefined {
        return pageConfigs.value.get(title)
    }

    /**
     * 根据二级导航 ID 获取页面配置
     */
    function getSubPageConfig(navTitle: string, subId: string): PageSubItem | undefined {
        // 1. 优先从预览配置中获取
        const previewRecord = previewPageConfigs.value.get(navTitle)
        if (previewRecord?.page_config?.items) {
            const item = previewRecord.page_config.items.find(i => i.id === subId)
            if (item) return item
        }

        // 2. 从正式配置中获取
        const record = pageConfigs.value.get(navTitle)
        if (!record?.page_config?.items) return undefined
        return record.page_config.items.find(item => item.id === subId)
    }

    /**
     * 根据二级导航 ID 查找所属的一级导航标题
     */
    function findNavTitleBySubId(subId: string): string | undefined {
        // 1. 优先从预览配置中查找
        for (const [title, record] of previewPageConfigs.value.entries()) {
            if (record.page_config.items.some(item => item.id === subId)) {
                return title
            }
        }

        // 2. 从正式配置中查找
        for (const [title, record] of pageConfigs.value.entries()) {
            if (record.page_config.items.some(item => item.id === subId)) {
                return title
            }
        }
        return undefined
    }

    // ============================================
    // 一级导航 CRUD
    // ============================================

    /**
     * 保存单个一级导航的配置
     */
    async function savePageConfig(title: string, content: PageConfigContent) {
        try {
            /* Auth handled by fetchApi */
            const { error } = await fetchApi('/configs/pages/sync', { method: 'POST', body: JSON.stringify({ upsert: [{ title, page_config: content }] }) }).catch(e => ({ error: e }))
            if (error) throw error

            // 更新本地缓存
            pageConfigs.value.set(title, { title, page_config: content })
            updateCache()
            lastSyncTime.value = new Date()
            return { success: true, data: { title, page_config: content } }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('保存页面配置失败:', error)
            syncError.value = msg
            return { success: false, message: msg }
        }
    }

    /**
     * 创建新的一级导航配置
     */
    async function createPageConfig(title: string, icon?: string, visible: boolean = true) {
        const content: PageConfigContent = {
            ...DEFAULT_PAGE_CONFIG_CONTENT,
            title,
            icon: icon || 'IconSettings',
            visible
        }
        return await savePageConfig(title, content)
    }

    /**
     * 删除一级导航配置
     */
    async function deletePageConfig(title: string) {
        try {
            /* Auth handled by fetchApi */
            const { error } = await fetchApi('/configs/pages/sync', { method: 'POST', body: JSON.stringify({ delete: [title] }) }).catch(e => ({ error: e }))
            if (error) throw error

            pageConfigs.value.delete(title)
            updateCache() // 更新缓存
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('删除页面配置失败:', error)
            toast.error('删除页面配置失败: ' + msg)
            return { success: false, message: msg }
        }
    }

    /**
     * 重命名一级导航
     */
    async function renamePageConfig(oldTitle: string, newTitle: string) {
        const record = pageConfigs.value.get(oldTitle)
        if (!record) {
            return { success: false, message: `一级导航 "${oldTitle}" 不存在` }
        }

        if (pageConfigs.value.has(newTitle)) {
            return { success: false, message: `一级导航 "${newTitle}" 已存在` }
        }

        try {
            /* Auth handled by fetchApi */
            const newContent: PageConfigContent = {
                ...record.page_config,
                title: newTitle
            }

            const { error } = await fetchApi('/configs/pages/sync', { method: 'POST', body: JSON.stringify({ delete: [oldTitle], upsert: [{ title: newTitle, page_config: newContent }] }) }).catch(e => ({ error: e }))
            if (error) throw error

            pageConfigs.value.delete(oldTitle) // 关键：删除旧的本地记录
            pageConfigs.value.set(newTitle, {
                ...record,
                title: newTitle,
                page_config: newContent
            })
            updateCache() // 更新缓存

            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('重命名一级导航失败:', error)
            toast.error('重命名一级导航失败: ' + msg)
            return { success: false, message: msg }
        }
    }

    // ============================================
    // 导航 CRUD 适配器 (供 Layouts 使用)
    // ============================================

    /**
     * 添加一级导航 (适配器)
     */
    async function addNavMainItem(item: { title: string, icon?: string, visible?: boolean }) {
        return await createPageConfig(item.title, item.icon, item.visible)
    }

    /**
     * 更新一级导航 (适配器)
     */
    async function updateNavMainItem(oldTitle: string, updates: { title?: string, icon?: string, visible?: boolean }) {
        const record = pageConfigs.value.get(oldTitle)
        if (!record) return { success: false, message: '导航不存在' }

        // 如果修改了标题，先执行重命名
        if (updates.title && updates.title !== oldTitle) {
            const renameResult = await renamePageConfig(oldTitle, updates.title)
            if (!renameResult.success) return renameResult
            // 更新后使用新标题继续更新其他属性
            oldTitle = updates.title
        }

        // 更新图标、可见性等其他属性
        const currentRecord = pageConfigs.value.get(oldTitle)
        if (currentRecord) {
            let hasChanges = false
            if (updates.icon !== undefined && updates.icon !== currentRecord.page_config.icon) {
                currentRecord.page_config.icon = updates.icon
                hasChanges = true
            }
            if (updates.visible !== undefined && updates.visible !== currentRecord.page_config.visible) {
                currentRecord.page_config.visible = updates.visible
                hasChanges = true
            }

            if (hasChanges) {
                return await savePageConfig(oldTitle, currentRecord.page_config)
            }
        }

        return { success: true }
    }

    /**
     * 删除一级导航 (适配器)
     */
    async function deleteNavMainItem(title: string) {
        return await deletePageConfig(title)
    }

    // ============================================
    // 二级导航 CRUD
    // ============================================

    /**
     * 添加二级导航页面
     */
    /**
     * 添加二级导航页面
     */
    async function addSubPage(navTitle: string, subItem: PageSubItem) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }
        if (record.page_config.items.some(i => i.id === subItem.id)) return { success: false, message: 'ID 已存在' }

        if (subItem.pageType === 'form') {
            subItem.formConfig = subItem.formConfig || { columnCount: 1, sections: [{ formItems: [] }] }
        } else {
            subItem.component = subItem.component || { ...DEFAULT_PAGE_COMPONENT }
        }
        record.page_config.items.push(subItem)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新二级导航页面配置 (通用)
     */
    async function updateSubPage(navTitle: string, subId: string, updates: Partial<PageSubItem>) {
        const record = pageConfigs.value.get(navTitle)
        const items = record?.page_config?.items
        const index = items?.findIndex(i => i.id === subId)
        if (index === undefined || index === -1) return { success: false, message: '导航项不存在' }

        Object.assign(items![index], updates)
        return await savePageConfig(navTitle, record!.page_config)
    }

    const updateSubPageComponent = (navTitle: string, subId: string, component: Page1ConfigData) =>
        updateSubPage(navTitle, subId, { component })

    const updateSubPageFormConfig = (navTitle: string, subId: string, formConfig: FormPageConfig) =>
        updateSubPage(navTitle, subId, { formConfig })

    /**
     * 删除二级导航页面
     */
    async function deleteSubPage(navTitle: string, subId: string) {
        const record = pageConfigs.value.get(navTitle)
        const items = record?.page_config?.items
        const index = items?.findIndex(i => i.id === subId)
        if (index === undefined || index === -1) return { success: false, message: '导航项不存在' }

        items!.splice(index, 1)
        return await savePageConfig(navTitle, record!.page_config)
    }

    /**
     * 重排序二级导航项
     */
    async function reorderSubPages(navTitle: string, newItems: PageSubItem[]) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: '记录不存在' }
        record.page_config.items = newItems
        return await savePageConfig(navTitle, record.page_config)
    }

    // ============================================
    // 组件区域 CRUD (参考 configStore)
    // ============================================

    /**
     * 更新筛选区配置
     */
    // --- 筛选区 ---
    const updateFilterArea = (navTitle: string, subId: string, updates: Partial<FilterAreaConfig>) =>
        _mutateComp(navTitle, subId, c => { Object.assign(c.filterArea, updates) })

    const addFilter = (navTitle: string, subId: string, filter: FilterConfig) =>
        _mutateComp(navTitle, subId, c => { c.filterArea.filters.push(filter) })

    const updateFilter = (navTitle: string, subId: string, key: string, updates: Partial<FilterConfig>) =>
        _mutateComp(navTitle, subId, c => {
            const f = c.filterArea.filters.find(i => i.key === key)
            f ? Object.assign(f, updates) : false
        })

    const deleteFilter = (navTitle: string, subId: string, key: string) =>
        _mutateComp(navTitle, subId, c => {
            const i = c.filterArea.filters.findIndex(f => f.key === key)
            i > -1 ? c.filterArea.filters.splice(i, 1) : false
        })

    // --- 表格区 ---
    const updateTableArea = (navTitle: string, subId: string, updates: Partial<TableAreaConfig>) =>
        _mutateComp(navTitle, subId, c => { Object.assign(c.tableArea, updates) })

    const addTableColumn = (navTitle: string, subId: string, column: TableColumn) =>
        _mutateComp(navTitle, subId, c => { c.tableArea.columns.push(column) })

    const updateTableColumn = (navTitle: string, subId: string, key: string, updates: Partial<TableColumn>) =>
        _mutateComp(navTitle, subId, c => {
            const col = c.tableArea.columns.find(i => i.key === key)
            col ? Object.assign(col, updates) : false
        })

    const deleteTableColumn = (navTitle: string, subId: string, key: string) =>
        _mutateComp(navTitle, subId, c => {
            const i = c.tableArea.columns.findIndex(col => col.key === key)
            i > -1 ? c.tableArea.columns.splice(i, 1) : false
        })

    // --- 操作区 ---
    const updateActionsArea = (navTitle: string, subId: string, updates: Partial<ActionsAreaConfig>) =>
        _mutateComp(navTitle, subId, c => {
            if (!c.actionsArea) c.actionsArea = { show: true, buttons: [] }
            Object.assign(c.actionsArea, updates)
        })

    const addActionButton = (navTitle: string, subId: string, btn: ActionButtonConfig) =>
        _mutateComp(navTitle, subId, c => {
            if (!c.actionsArea) c.actionsArea = { show: true, buttons: [] }
            c.actionsArea.buttons.push(btn)
        })

    const deleteActionButton = (navTitle: string, subId: string, key: string) =>
        _mutateComp(navTitle, subId, c => {
            const i = c.actionsArea?.buttons?.findIndex(b => b.key === key) ?? -1
            i > -1 ? c.actionsArea!.buttons.splice(i, 1) : false
        })

    // --- 卡片区 ---
    const updateCardArea = (navTitle: string, subId: string, updates: Partial<CardAreaConfig>) =>
        _mutateComp(navTitle, subId, c => {
            if (!c.cardArea) c.cardArea = { show: false, columns: 4, gap: '16px', cards: [] }
            Object.assign(c.cardArea, updates)
        })

    const addCard = (navTitle: string, subId: string, card: CardItemConfig) =>
        _mutateComp(navTitle, subId, c => {
            if (!c.cardArea) c.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
            c.cardArea.cards.push(card)
        })

    const deleteCard = (navTitle: string, subId: string, key: string) =>
        _mutateComp(navTitle, subId, c => {
            const i = c.cardArea?.cards?.findIndex(k => k.key === key) ?? -1
            i > -1 ? c.cardArea!.cards.splice(i, 1) : false
        })

    // ============================================
    // 批量操作与导入导出
    // ============================================

    /**
     * 设置预览配置 (AI 调用)
     * 支持单个或批量设置
     */
    function setPreviewPageConfig(title: string, record: PageConfigRecord) {
        previewPageConfigs.value.set(title, record)
        // Force reactivity update for Ref<Map> if needed, or ensuring dependent computeds re-evaluate
        // In some Vue versions, .set on a ref(Map) triggers, but to be safe:
        previewPageConfigs.value = new Map(previewPageConfigs.value)
    }

    /**
     * 清空预览配置
     */
    function clearPreview() {
        previewPageConfigs.value.clear()
    }

    /**
     * 应用预览配置 (将预览数据写入正式数据并同步)
     */
    async function applyPreview() {
        try {
            const updates: PageConfigRecord[] = []

            // 1. 更新本地状态
            previewPageConfigs.value.forEach((record, title) => {
                // 更新正式 Map
                pageConfigs.value.set(title, record)
                updates.push(record)
            })

            // 2. 更新缓存
            updateCache()

            // 注意: 这里的 saveAll 是先删后插，如果只是部分更新，应该用 upsert
            // 为了安全起见，我们这里使用批量 upsert 逻辑
            if (updates.length > 0) {
                const { error } = await fetchApi('/configs/pages/sync', { method: 'POST', body: JSON.stringify({ upsert: updates }) }).catch(e => ({ error: e }))
                if (error) throw error
            }

            // 4. 清空预览
            clearPreview()
            lastSyncTime.value = new Date()

            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('应用预览配置失败:', error)
            return { success: false, message: msg }
        }
    }

    /**
     * 批量保存所有页面配置
     */
    async function saveAllPageConfigs(configs: PageConfigRecord[]) {
        try {
            /* Auth handled by fetchApi */
            const { error } = await fetchApi('/configs/pages/sync', { method: 'POST', body: JSON.stringify({ upsert: configs, deleteAll: true }) }).catch(e => ({ error: e }))
            if (error) throw error

            await loadPageConfigs()
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            console.error('批量保存页面配置失败:', error)
            toast.error('批量保存页面配置失败: ' + msg)
            return { success: false, message: msg }
        }
    }

    /**
     * 导出所有页面配置
     */
    function exportPageConfigs(): PageConfigRecord[] {
        return Array.from(pageConfigs.value.values()).map(record => ({
            title: record.title,
            page_config: record.page_config
        }))
    }

    // ============================================
    // 同步控制
    // ============================================

    // 同步配置到导航系统
    watch([navGroups, pageConfigs], () => {
        setNavGroupsRef(navGroups.value)

        // 如果未初始化且有数据，尝试初始化导航选中状态
        if (!isLoaded.value && navGroups.value.length > 0) {
            initNavigation(navGroups.value)
        }
    }, { immediate: true })

    /**
     * 确保所有待处理的同步完成
     */
    async function ensureSynced(): Promise<void> {
        // V9: 取消防抖同步，改为直接同步，此方法保留为空以兼容接口
    }

    /**
     * 重置所有配置
     */
    function resetToDefaults() {
        pageConfigs.value.clear()
        isLoaded.value = false
        lastSyncTime.value = null
        syncError.value = null
    }

    return {
        // State
        pageConfigs,
        pageConfigList,
        isLoaded,
        isLoading,
        isSyncing,
        lastSyncTime,
        syncError,

        // 加载
        loadPageConfigs,
        loadFromCache,

        // 查询
        getPageConfigByTitle,
        getSubPageConfig,
        findNavTitleBySubId,
        navGroups,

        // 导航 CRUD
        addNavMainItem,
        updateNavMainItem,
        deleteNavMainItem,

        // 一级导航操作
        createPageConfig,
        savePageConfig,
        deletePageConfig,
        renamePageConfig,

        // 二级导航操作
        addSubPage,
        updateSubPage,
        updateSubPageComponent,
        updateSubPageFormConfig,
        deleteSubPage,
        reorderSubPages,

        // 组件区
        updateFilterArea,
        addFilter,
        updateFilter,
        deleteFilter,
        updateTableArea,
        addTableColumn,
        updateTableColumn,
        deleteTableColumn,
        updateActionsArea,
        addActionButton,
        deleteActionButton,
        updateCardArea,
        addCard,
        deleteCard,

        // 批量 & Preview
        saveAllPageConfigs,
        setPreviewPageConfig,
        clearPreview,
        applyPreview,
        exportPageConfigs,

        // 同步控制
        ensureSynced,
        resetToDefaults
    }
})
