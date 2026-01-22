import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/api/supabase'
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
    CardItemConfig
} from '@/types/page-config'
import type { NavSubItem, NavGroup, NavMainItem } from '@/types/navigation'
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
    items: PageSubItem[]     // 二级导航项列表
}

/**
 * 二级导航项配置
 */
export interface PageSubItem {
    id: string               // 二级导航 ID
    name: string             // 二级导航名称
    component?: Page1ConfigData  // 页面组件配置
}

/**
 * 默认的一级导航配置模板 (用于新建)
 */
const DEFAULT_PAGE_CONFIG_CONTENT: PageConfigContent = {
    title: '默认导航',
    icon: 'IconSettings',
    isOpen: true,
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

    // 同步状态
    const isSyncing = ref(false)
    const lastSyncTime = ref<Date | null>(null)
    const syncError = ref<string | null>(null)
    const CACHE_KEY = 'aigen_page_config_cache'

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
     * 获取所有页面配置的数组形式
     */
    const pageConfigList = computed(() => Array.from(pageConfigs.value.values()))



    /**
     * 适配 layouts 的导航组结构 (将所有一级导航聚合到一个默认组)
     */
    const navGroups = computed<NavGroup[]>(() => {
        const mainItems: NavMainItem[] = Array.from(pageConfigs.value.values()).map(record => ({
            id: record.title, // 使用 title 作为 ID
            title: record.title,
            icon: record.page_config.icon || 'IconSettings',
            isOpen: record.page_config.isOpen,
            items: record.page_config.items.map(sub => ({
                id: sub.id,
                title: sub.name,
                url: '#', // 默认 URL
                component: sub.component
            }))
        }))

        return [{
            label: 'Application',
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
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { data, error } = await supabase
                .from('page_configs')
                .select('*')
                .eq('user_id', user.id)

            if (error) throw error

            // 清空并重新填充
            pageConfigs.value.clear()
            if (data && data.length > 0) {
                data.forEach((record: PageConfigRecord) => {
                    pageConfigs.value.set(record.title, record)
                })
                // 更新缓存
                updateCache()
            } else {
                // 如果云端没数据，自动创建默认配置 (与 menu/team store 逻辑一致)
                const defaultTitle = DEFAULT_PAGE_CONFIG_RECORD.title
                await savePageConfig(defaultTitle, DEFAULT_PAGE_CONFIG_RECORD)
            }
            isLoaded.value = true
            return { success: true }
        } catch (error: any) {
            console.error('加载页面配置失败:', error)
            toast.error('加载页面配置失败: ' + error.message)
            return { success: false, message: error.message }
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
        const record = pageConfigs.value.get(navTitle)
        if (!record?.page_config?.items) return undefined
        return record.page_config.items.find(item => item.id === subId)
    }

    /**
     * 根据二级导航 ID 查找所属的一级导航标题
     */
    function findNavTitleBySubId(subId: string): string | undefined {
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
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { data, error } = await supabase
                .from('page_configs')
                .upsert({
                    user_id: user.id,
                    title: title,
                    page_config: content,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id,title' })
                .select()
                .single()

            if (error) throw error

            // 更新本地缓存
            if (data) {
                pageConfigs.value.set(title, data)
                updateCache() // 更新缓存
            }
            lastSyncTime.value = new Date()
            return { success: true, data }
        } catch (error: any) {
            console.error('保存页面配置失败:', error)
            syncError.value = error.message
            return { success: false, message: error.message }
        }
    }

    /**
     * 创建新的一级导航配置
     */
    async function createPageConfig(title: string, icon?: string) {
        const content: PageConfigContent = {
            ...DEFAULT_PAGE_CONFIG_CONTENT,
            title,
            icon: icon || 'IconSettings'
        }
        return await savePageConfig(title, content)
    }

    /**
     * 删除一级导航配置
     */
    async function deletePageConfig(title: string) {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { error } = await supabase
                .from('page_configs')
                .delete()
                .eq('user_id', user.id)
                .eq('title', title)

            if (error) throw error

            pageConfigs.value.delete(title)
            updateCache() // 更新缓存
            return { success: true }
        } catch (error: any) {
            console.error('删除页面配置失败:', error)
            toast.error('删除页面配置失败: ' + error.message)
            return { success: false, message: error.message }
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
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const newContent: PageConfigContent = {
                ...record.page_config,
                title: newTitle
            }

            const { error: insertError } = await supabase
                .from('page_configs')
                .insert({
                    user_id: user.id,
                    title: newTitle,
                    page_config: newContent
                })

            if (insertError) throw insertError

            const { error: deleteError } = await supabase
                .from('page_configs')
                .delete()
                .eq('user_id', user.id)
                .eq('title', oldTitle)

            if (deleteError) throw deleteError

            pageConfigs.value.set(newTitle, {
                ...record,
                title: newTitle,
                page_config: newContent
            })
            updateCache() // 更新缓存

            return { success: true }
        } catch (error: any) {
            console.error('重命名一级导航失败:', error)
            toast.error('重命名一级导航失败: ' + error.message)
            return { success: false, message: error.message }
        }
    }

    // ============================================
    // 导航 CRUD 适配器 (供 Layouts 使用)
    // ============================================

    /**
     * 添加一级导航 (适配器)
     */
    async function addNavMainItem(item: { title: string, icon?: string }) {
        return await createPageConfig(item.title, item.icon)
    }

    /**
     * 更新一级导航 (适配器)
     */
    async function updateNavMainItem(oldTitle: string, updates: { title?: string, icon?: string }) {
        const record = pageConfigs.value.get(oldTitle)
        if (!record) return { success: false, message: '导航不存在' }

        // 如果修改了标题，先执行重命名
        if (updates.title && updates.title !== oldTitle) {
            const renameResult = await renamePageConfig(oldTitle, updates.title)
            if (!renameResult.success) return renameResult
            // 更新后使用新标题继续更新其他属性
            oldTitle = updates.title
        }

        // 更新图标等其他属性
        if (updates.icon) {
            const currentRecord = pageConfigs.value.get(oldTitle)
            if (currentRecord) {
                currentRecord.page_config.icon = updates.icon
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
    async function addSubPage(navTitle: string, subItem: PageSubItem) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) {
            return { success: false, message: `一级导航 "${navTitle}" 不存在` }
        }

        if (record.page_config.items.some(item => item.id === subItem.id)) {
            return { success: false, message: `二级导航 ID "${subItem.id}" 已存在` }
        }

        // 如果没有 component，添加默认的
        if (!subItem.component) {
            subItem.component = { ...DEFAULT_PAGE_COMPONENT }
        }

        record.page_config.items.push(subItem)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新二级导航页面配置
     */
    async function updateSubPage(navTitle: string, subId: string, updates: Partial<PageSubItem>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) {
            return { success: false, message: `一级导航 "${navTitle}" 不存在` }
        }

        const itemIndex = record.page_config.items.findIndex(item => item.id === subId)
        if (itemIndex === -1) {
            return { success: false, message: `二级导航 "${subId}" 不存在` }
        }

        record.page_config.items[itemIndex] = {
            ...record.page_config.items[itemIndex],
            ...updates
        }
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新二级导航页面的组件配置
     */
    async function updateSubPageComponent(navTitle: string, subId: string, component: Page1ConfigData) {
        return await updateSubPage(navTitle, subId, { component })
    }

    /**
     * 删除二级导航页面
     */
    async function deleteSubPage(navTitle: string, subId: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) {
            return { success: false, message: `一级导航 "${navTitle}" 不存在` }
        }

        const itemIndex = record.page_config.items.findIndex(item => item.id === subId)
        if (itemIndex === -1) {
            return { success: false, message: `二级导航 "${subId}" 不存在` }
        }

        record.page_config.items.splice(itemIndex, 1)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 重排序二级导航项
     */
    async function reorderSubPages(navTitle: string, newItems: PageSubItem[]) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) {
            return { success: false, message: `一级导航 "${navTitle}" 不存在` }
        }

        record.page_config.items = newItems
        return await savePageConfig(navTitle, record.page_config)
    }

    // ============================================
    // 组件区域 CRUD (参考 configStore)
    // ============================================

    /**
     * 更新筛选区配置
     */
    async function updateFilterArea(navTitle: string, subId: string, updates: Partial<FilterAreaConfig>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        Object.assign(subItem.component.filterArea, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 添加筛选项
     */
    async function addFilter(navTitle: string, subId: string, filter: FilterConfig) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        subItem.component.filterArea.filters.push(filter)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新筛选项
     */
    async function updateFilter(navTitle: string, subId: string, filterKey: string, updates: Partial<FilterConfig>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        const filter = subItem.component.filterArea.filters.find(f => f.key === filterKey)
        if (!filter) return { success: false, message: `筛选项 "${filterKey}" 不存在` }

        Object.assign(filter, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 删除筛选项
     */
    async function deleteFilter(navTitle: string, subId: string, filterKey: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        const index = subItem.component.filterArea.filters.findIndex(f => f.key === filterKey)
        if (index === -1) return { success: false, message: `筛选项 "${filterKey}" 不存在` }

        subItem.component.filterArea.filters.splice(index, 1)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新表格区配置
     */
    async function updateTableArea(navTitle: string, subId: string, updates: Partial<TableAreaConfig>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        Object.assign(subItem.component.tableArea, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 添加表格列
     */
    async function addTableColumn(navTitle: string, subId: string, column: TableColumn) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        subItem.component.tableArea.columns.push(column)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新表格列
     */
    async function updateTableColumn(navTitle: string, subId: string, columnKey: string, updates: Partial<TableColumn>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        const column = subItem.component.tableArea.columns.find(c => c.key === columnKey)
        if (!column) return { success: false, message: `表格列 "${columnKey}" 不存在` }

        Object.assign(column, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 删除表格列
     */
    async function deleteTableColumn(navTitle: string, subId: string, columnKey: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        const index = subItem.component.tableArea.columns.findIndex(c => c.key === columnKey)
        if (index === -1) return { success: false, message: `表格列 "${columnKey}" 不存在` }

        subItem.component.tableArea.columns.splice(index, 1)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新操作区配置
     */
    async function updateActionsArea(navTitle: string, subId: string, updates: Partial<ActionsAreaConfig>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        if (!subItem.component.actionsArea) {
            subItem.component.actionsArea = { show: true, buttons: [] }
        }
        Object.assign(subItem.component.actionsArea, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 添加操作按钮
     */
    async function addActionButton(navTitle: string, subId: string, button: ActionButtonConfig) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        if (!subItem.component.actionsArea) {
            subItem.component.actionsArea = { show: true, buttons: [] }
        }
        subItem.component.actionsArea.buttons.push(button)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 删除操作按钮
     */
    async function deleteActionButton(navTitle: string, subId: string, buttonKey: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component?.actionsArea) return { success: false, message: `二级导航 "${subId}" 不存在或无操作区` }

        const index = subItem.component.actionsArea.buttons.findIndex(b => b.key === buttonKey)
        if (index === -1) return { success: false, message: `按钮 "${buttonKey}" 不存在` }

        subItem.component.actionsArea.buttons.splice(index, 1)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 更新卡片区配置
     */
    async function updateCardArea(navTitle: string, subId: string, updates: Partial<CardAreaConfig>) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        if (!subItem.component.cardArea) {
            subItem.component.cardArea = { show: false, columns: 4, gap: '16px', cards: [] }
        }
        Object.assign(subItem.component.cardArea, updates)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 添加卡片
     */
    async function addCard(navTitle: string, subId: string, card: CardItemConfig) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component) return { success: false, message: `二级导航 "${subId}" 不存在或无组件` }

        if (!subItem.component.cardArea) {
            subItem.component.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
        }
        subItem.component.cardArea.cards.push(card)
        return await savePageConfig(navTitle, record.page_config)
    }

    /**
     * 删除卡片
     */
    async function deleteCard(navTitle: string, subId: string, cardKey: string) {
        const record = pageConfigs.value.get(navTitle)
        if (!record) return { success: false, message: `一级导航 "${navTitle}" 不存在` }

        const subItem = record.page_config.items.find(item => item.id === subId)
        if (!subItem?.component?.cardArea) return { success: false, message: `二级导航 "${subId}" 不存在或无卡片区` }

        const index = subItem.component.cardArea.cards.findIndex(c => c.key === cardKey)
        if (index === -1) return { success: false, message: `卡片 "${cardKey}" 不存在` }

        subItem.component.cardArea.cards.splice(index, 1)
        return await savePageConfig(navTitle, record.page_config)
    }

    // ============================================
    // 批量操作与导入导出
    // ============================================

    /**
     * 批量保存所有页面配置
     */
    async function saveAllPageConfigs(configs: PageConfigRecord[]) {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { error: deleteError } = await supabase
                .from('page_configs')
                .delete()
                .eq('user_id', user.id)

            if (deleteError) throw deleteError

            if (configs.length > 0) {
                const insertData = configs.map(config => ({
                    user_id: user.id,
                    title: config.title,
                    page_config: config.page_config
                }))

                const { error: insertError } = await supabase
                    .from('page_configs')
                    .insert(insertData)

                if (insertError) throw insertError
            }

            await loadPageConfigs()
            return { success: true }
        } catch (error: any) {
            console.error('批量保存页面配置失败:', error)
            toast.error('批量保存页面配置失败: ' + error.message)
            return { success: false, message: error.message }
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

    /**
     * 从导航结构转换为页面配置 (V1/V2 迁移)
     */
    function convertFromNavItems(navTitle: string, icon: string, isOpen: boolean, items: NavSubItem[]): PageConfigContent {
        return {
            title: navTitle,
            icon,
            isOpen,
            items: items.map(item => ({
                id: item.id,
                name: item.title,
                component: item.component
            }))
        }
    }

    /**
     * 从旧版 configStore 格式迁移
     */
    async function migrateFromConfigStore(navGroups: any[], page1Configs: Record<string, Page1ConfigData>) {
        const newConfigs: PageConfigRecord[] = []

        for (const group of navGroups) {
            for (const mainItem of (group.items || [])) {
                const content: PageConfigContent = {
                    title: mainItem.title,
                    icon: mainItem.icon || 'IconSettings',
                    isOpen: mainItem.isOpen ?? true,
                    items: (mainItem.items || []).map((subItem: any) => ({
                        id: subItem.id,
                        name: subItem.title,
                        component: page1Configs[subItem.id] || subItem.component
                    }))
                }

                newConfigs.push({
                    title: mainItem.title,
                    page_config: content
                })
            }
        }

        return await saveAllPageConfigs(newConfigs)
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
    }, { deep: true, immediate: true })

    /**
     * 确保所有待处理的同步完成
     */
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

        // Computed


        // 加载
        loadPageConfigs,
        loadFromCache,

        // 查询
        getPageConfigByTitle,
        getSubPageConfig,
        findNavTitleBySubId,
        navGroups, // 暴露给 Layouts 使用
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
        deleteSubPage,
        reorderSubPages,

        // 筛选区操作
        updateFilterArea,
        addFilter,
        updateFilter,
        deleteFilter,

        // 表格区操作
        updateTableArea,
        addTableColumn,
        updateTableColumn,
        deleteTableColumn,

        // 操作区操作
        updateActionsArea,
        addActionButton,
        deleteActionButton,

        // 卡片区操作
        updateCardArea,
        addCard,
        deleteCard,

        // 批量操作
        saveAllPageConfigs,
        exportPageConfigs,

        // 迁移辅助
        convertFromNavItems,
        migrateFromConfigStore,

        // 同步控制
        ensureSynced,
        resetToDefaults
    }
})
