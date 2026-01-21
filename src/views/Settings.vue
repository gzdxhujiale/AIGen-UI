<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
// Card components removed - using plain divs with border/bg-card
import { Layers, Plus, Pencil, Trash2, Settings2, FileCode, GripVertical, Info, ChevronRight, Eye, EyeOff, Download, Upload, Search, MoreHorizontal, RefreshCw } from 'lucide-vue-next'

import { Input as AInput, InputNumber as AInputNumber, Select as ASelect, Option as AOption, Scrollbar as AScrollbar, Modal as AModal, Message, Button as AButton, Dropdown as ADropdown, Doption as ADoption, Tabs as ATabs, TabPane as ATabPane } from '@arco-design/web-vue'
import { Button } from '@/components/ui/button'
import { 
  IconSettings, 
  IconApps, 
  IconList, 
  IconFile, 
  IconFolder, 
  IconHome, 
  IconUser, 
  IconDashboard,
  IconStorage,
  IconCalendar,
  IconSafe,
  IconFire
} from '@arco-design/web-vue/es/icon'

import draggable from 'vuedraggable'

import { useConfigStore, type NavSubItem, type FilterConfig, type TableColumn } from '@/stores/configStore'
import Page1 from '@/views/Page1.vue'
import ConfigFilterForm from '@/components/config/ConfigFilterForm.vue'
import ConfigColumnForm from '@/components/config/ConfigColumnForm.vue'
import ConfigActionForm from '@/components/config/ConfigActionForm.vue'
import ConfigCardForm from '@/components/config/ConfigCardForm.vue'

import { useConfigCrud } from '@/composables/useConfigCrud'
import { safeJsonParseWithError } from '@/utils/error'

// Store
const configStore = useConfigStore()

// UI State - 当前选中的导航项
const selectedNavId = ref<string | null>(null)
const searchQuery = ref('') // 侧边栏搜索

// 一级导航展开/折叠状态
const expandedMainItems = reactive<Record<string, boolean>>({})

// 初始化展开状态（默认全部展开）
const initExpandedState = () => {
  configStore.navGroups.forEach(group => {
    group.items.forEach(mainItem => {
      if (expandedMainItems[mainItem.id] === undefined) {
        expandedMainItems[mainItem.id] = mainItem.isOpen ?? true
      }
    })
  })
}

// 切换一级导航展开状态
const toggleMainItemExpand = (mainItemId: string) => {
  expandedMainItems[mainItemId] = !expandedMainItems[mainItemId]
}

// 过滤后的导航组 (Search Enhancement)
const filteredNavGroups = computed(() => {
  if (!searchQuery.value) return configStore.navGroups

  const query = searchQuery.value.toLowerCase()
  return configStore.navGroups.map(group => {
    const filteredItems = group.items.map(mainItem => {
      // 如果主导航匹配，显示所有子导航
      if (mainItem.title.toLowerCase().includes(query)) return mainItem

      // 否则过滤子导航
      const filteredSubItems = mainItem.items?.filter(sub => 
        sub.title.toLowerCase().includes(query)
      )

      if (filteredSubItems?.length) {
        return { ...mainItem, items: filteredSubItems, isOpen: true } // 搜索时自动展开
      }
      return null
    }).filter(Boolean) as typeof group.items

    return { ...group, items: filteredItems }
  }).filter(group => group.items.length > 0)
})

// Dialog State
const editNavDialogOpen = ref(false)
const editMainNavDialogOpen = ref(false)
const editingMainNavId = ref<string | null>(null)
const editingGroupIndex = ref<number | null>(null)
const editingMainNav = ref<any>(null)



// Form State
const navForm = ref({
  title: '',
  // template field removed - utilizing component structure
})

const mainNavForm = ref({
  title: '',
  icon: 'IconSettings'
})

const availableIcons = [
  { label: 'Settings', value: 'IconSettings', component: IconSettings },
  { label: 'Apps', value: 'IconApps', component: IconApps },
  { label: 'List', value: 'IconList', component: IconList },
  { label: 'File', value: 'IconFile', component: IconFile },
  { label: 'Folder', value: 'IconFolder', component: IconFolder },
  { label: 'Home', value: 'IconHome', component: IconHome },
  { label: 'User', value: 'IconUser', component: IconUser },
  { label: 'Dashboard', value: 'IconDashboard', component: IconDashboard },
  { label: 'Storage', value: 'IconStorage', component: IconStorage },
  { label: 'Calendar', value: 'IconCalendar', component: IconCalendar },
  { label: 'Safe', value: 'IconSafe', component: IconSafe },
  { label: 'Fire', value: 'IconFire', component: IconFire },
]

// Active Tab State for Preview Control
const activeTab = ref('filter')



// 获取所有子导航项（扁平化）
const allSubNavItems = computed(() => {
  const items: { groupIndex: number; mainItemId: string; subItem: NavSubItem }[] = []
  configStore.navGroups.forEach((group, groupIndex) => {
    group.items.forEach(mainItem => {
      mainItem.items?.forEach(subItem => {
        items.push({ groupIndex, mainItemId: mainItem.id, subItem })
      })
    })
  })
  return items
})

// 当前选中的导航项信息
const selectedNavInfo = computed(() => {
  if (!selectedNavId.value) return null
  return allSubNavItems.value.find(item => item.subItem.id === selectedNavId.value)
})

// 当前导航的页面配置 (Issue 2: 使用 getter 确保响应性)
const currentPageConfig = computed(() => {
  if (!selectedNavId.value) return null
  return configStore.getPage1Config(selectedNavId.value) || null
})

// 默认选中第一个导航项
onMounted(() => {
  initExpandedState()
  if (allSubNavItems.value.length > 0 && !selectedNavId.value) {
    selectedNavId.value = allSubNavItems.value[0].subItem.id
  }
})

// ============================================
// 确认对话框辅助函数 (Issue 7: 替代 confirm())
// ============================================
const confirmDialogOpen = ref(false)
const confirmDialogTitle = ref('')
const confirmDialogDescription = ref('')
const pendingConfirmAction = ref<(() => void) | null>(null)

const showConfirm = (title: string, description: string, action: () => void) => {
  confirmDialogTitle.value = title
  confirmDialogDescription.value = description
  pendingConfirmAction.value = action
  confirmDialogOpen.value = true
}

const handleConfirmAction = () => {
  if (pendingConfirmAction.value) {
    pendingConfirmAction.value()
  }
  confirmDialogOpen.value = false
  pendingConfirmAction.value = null
}

const handleCancelConfirm = () => {
  confirmDialogOpen.value = false
  pendingConfirmAction.value = null
}

// ============================================
// Data Driven Headers
// ============================================

const filterHeaders = [
    { key: 'empty', label: '', width: 'w-8', align: 'center' },
    { key: 'type', label: '类型', width: 'w-24', align: 'left' },
    { key: 'label', label: '标签', width: 'w-32', align: 'left' },
    { key: 'key', label: '字段名', width: 'w-32', align: 'left' },
    { key: 'options', label: '选项/配置', width: 'w-auto', align: 'left' },
    { key: 'action', label: '操作', width: 'w-20', align: 'right' }
]

const actionHeaders = [
    { key: 'empty', label: '', width: 'w-8', align: 'center' },
    { key: 'label', label: '标签', width: 'w-32', align: 'left' },
    { key: 'key', label: 'Key', width: 'w-32', align: 'left' },
    { key: 'variant', label: '样式', width: 'w-24', align: 'left' },
    { key: 'effect', label: '效果', width: 'w-24', align: 'left' },
    { key: 'className', label: '自定义类名', width: 'w-32', align: 'left' },
    { key: 'action', label: '操作', width: 'w-16', align: 'right' }
]

const cardHeaders = [
    { key: 'empty', label: '', width: 'w-8', align: 'center' },
    { key: 'key', label: 'Key', width: 'w-32', align: 'left' },
    { key: 'title', label: '标题', width: 'w-32', align: 'left' },
    { key: 'data', label: '数据', width: 'w-auto', align: 'left' },
    { key: 'action', label: '操作', width: 'w-16', align: 'right' }
]

const columnHeaders = [
    { key: 'empty', label: '', width: 'w-8', align: 'center' },
    { key: 'type', label: '类型', width: 'w-24', align: 'left' },
    { key: 'label', label: '标签', width: 'w-32', align: 'left' },
    { key: 'key', label: '字段名', width: 'w-32', align: 'left' },
    { key: 'width', label: '宽度', width: 'w-24', align: 'left' },
    { key: 'format', label: '数据格式 / 按钮配置', width: 'w-auto', align: 'left' },
    { key: 'action', label: '操作', width: 'w-16', align: 'right' }
]

// ============================================
// CRUD Composables
// ============================================

// Filter CRUD
const filterCrud = useConfigCrud({
    name: '筛选项',
    defaultForm: () => ({
        key: '',
        type: 'input' as 'input' | 'select' | 'date-range' | 'tree-select',
        label: '',
        placeholder: '',
        options: '', 
        treeOptions: '',
        visible: true
    }),
    doSave: (modifying, index, form) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (!config) return

        const newFilter: FilterConfig = {
            key: form.key,
            type: form.type,
            label: form.label,
            placeholder: form.placeholder || undefined,
            visible: form.visible
        }

        if (form.type === 'select') {
            newFilter.defaultValue = '全部'
            newFilter.options = form.options ? form.options.split(/[，,]/).map(s => s.trim()).filter(s => s) : []
        } else if (form.type === 'tree-select') {
            newFilter.defaultValue = ''
            const parsed = safeJsonParseWithError(form.treeOptions || '[]', '树形数据 (Tree Options)')
            if (parsed === null) {
                return // 解析失败，用户已收到错误提示
            }
            newFilter.treeOptions = parsed as any[]
        } else if (form.type === 'date-range') {
            newFilter.defaultValue = undefined
        } else {
            newFilter.defaultValue = ''
        }
        
        if (modifying && index !== null) {
             config.filterArea.filters[index] = newFilter
        } else {
             config.filterArea.filters.push(newFilter)
        }
    },
    doDelete: (index) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (config) config.filterArea.filters.splice(index, 1)
    }
})

// Column CRUD
const columnCrud = useConfigCrud({
    name: '表格列',
    defaultForm: () => ({
        key: '',
        label: '',
        width: '100px',
        type: 'text' as 'text' | 'badge' | 'status-badge' | 'text-button', 
        mockFormat: 'none' as 'none' | 'text' | 'datetime' | 'number' | 'list',
        mockList: '',
        buttons: '',
        fixed: 'none' as 'none' | 'left' | 'right',
        align: 'left' as 'left' | 'center' | 'right',
        ellipsis: false,
        tooltip: false,
        visible: true
    }),
    doSave: (modifying, index, form) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (!config) return

        const newColumn: TableColumn = {
            key: form.key,
            label: form.label,
            width: form.width || undefined,
            type: form.type === 'text' ? undefined : form.type,
            mockFormat: form.mockFormat === 'none' ? undefined : form.mockFormat,
            mockList: form.mockFormat === 'list' ? form.mockList.split(',').map(s => s.trim()).filter(Boolean) : undefined,
            buttons: form.type === 'text-button' && form.buttons ? form.buttons.split(/[，,]/).map(s => s.trim()).filter(s => s) : undefined,
            fixed: form.fixed === 'none' ? undefined : form.fixed,
            align: form.align === 'left' ? undefined : form.align,
            ellipsis: form.ellipsis || undefined,
            tooltip: form.tooltip || undefined,
            visible: form.visible
        }
        
        if (modifying && index !== null) {
            config.tableArea.columns[index] = newColumn
        } else {
            config.tableArea.columns.push(newColumn)
        }
    },
    doDelete: (index) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (config) config.tableArea.columns.splice(index, 1)
    }
})

// Action CRUD
const actionCrud = useConfigCrud({
    name: '操作按钮',
    defaultForm: () => ({
        key: '',
        label: '',
        variant: 'shadcn-outline' as 'primary' | 'outline' | 'text' | 'shadcn-outline',
        className: '',
        effectType: 'none' as 'none' | 'modal',
        effectTitle: '',
        effectContent: '',
        effectFormItems: [] as any[],
        visible: true
    }),
    doSave: (modifying, index, form) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (!config) return

        if (!config.actionsArea) config.actionsArea = { buttons: [] }
       if (!config.actionsArea.buttons) config.actionsArea.buttons = []
        
        const newAction: any = {
            key: form.key,
            label: form.label,
            variant: form.variant,
            className: form.className || undefined,
            effectType: form.effectType === 'none' ? undefined : form.effectType,
            visible: form.visible
        }
        
        if (form.effectType === 'modal') {
            newAction.effectConfig = {
                title: form.effectTitle,
                content: form.effectContent,
                formItems: form.effectFormItems.length > 0 ? form.effectFormItems : undefined
            }
        }
        
        if (modifying && index !== null) {
            config.actionsArea.buttons[index] = newAction
        } else {
            config.actionsArea.buttons.push(newAction)
        }
    },
    doDelete: (index) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (config?.actionsArea?.buttons) config.actionsArea.buttons.splice(index, 1)
    }
})

// Card CRUD
const cardCrud = useConfigCrud({
    name: '卡片',
    defaultForm: () => ({
        key: '',
        title: '',
        data: ''
    }),
    doSave: (modifying, index, form) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (!config) return

        if (!config.cardArea) config.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
        if (!config.cardArea.cards) config.cardArea.cards = []
        
        const newCard = {
            key: form.key,
            title: form.title,
            data: form.data
        }
        
        if (modifying && index !== null) {
           config.cardArea.cards[index] = newCard
        } else {
           config.cardArea.cards.push(newCard)
        }
    },
    doDelete: (index) => {
        if (!selectedNavId.value) return
        const config = configStore.page1Configs[selectedNavId.value]
        if (config?.cardArea?.cards) config.cardArea.cards.splice(index, 1)
    }
})

// ============================================
// Data Transformation Code (Helpers for openEdit)
// ============================================

const transformFilter = (item: any) => ({
    ...item,
    placeholder: item.placeholder || '',
    options: item.options?.join(',') || '',
    treeOptions: item.treeOptions ? JSON.stringify(item.treeOptions) : '',
    visible: item.visible ?? true
})

const transformColumn = (item: any) => ({
    ...item,
    type: item.type || 'text',
    width: item.width || '120px',
    mockFormat: item.mockFormat || 'text',
    mockList: item.mockList ? item.mockList.join(',') : '',
    buttons: item.buttons ? item.buttons.join(',') : '',
    visible: item.visible ?? true,
    fixed: item.fixed || 'none',
    align: item.align || 'left',
    ellipsis: item.ellipsis || false,
    tooltip: item.tooltip || false
})

const transformAction = (item: any) => ({
    ...item,
    className: item.className || '',
    variant: item.variant || 'outline',
    effectType: item.effectType || 'none',
    effectTitle: item.effectConfig?.title || '',
    effectContent: item.effectConfig?.content || '',
    effectFormItems: item.effectConfig?.formItems || [],
    visible: item.visible ?? true
})

const transformCard = (item: any) => ({
    ...item,
    data: String(item.data)
})

// ============================================
// Navigation Item Actions
// ============================================

const handleSelectNav = (navId: string) => {
  selectedNavId.value = navId
}

const openEditNavDialog = () => {
  if (selectedNavInfo.value) {
    navForm.value = {
      title: selectedNavInfo.value.subItem.title
    }
    editNavDialogOpen.value = true
  }
}

const closeEditNavDialog = () => {
  editNavDialogOpen.value = false
}

const handleEditNav = () => {
  if (selectedNavInfo.value && navForm.value.title) {
    configStore.updateSubNavItem(
      selectedNavInfo.value.groupIndex,
      selectedNavInfo.value.mainItemId,
      selectedNavId.value!,
      {
        title: navForm.value.title
      }
    )
    closeEditNavDialog()
  }
}

const openEditMainNavDialog = (groupIndex: number, mainItem: any) => {
  editingGroupIndex.value = groupIndex
  editingMainNavId.value = mainItem.id
  editingMainNav.value = mainItem
  
  // Try to get icon name
  let iconName = 'IconSettings'
  if (typeof mainItem.icon === 'string') {
    iconName = mainItem.icon
  } else if (mainItem.icon?.name) {
    iconName = mainItem.icon.name
  } else if (mainItem.icon?.__name) {
    iconName = mainItem.icon.__name
  }

  mainNavForm.value = {
    title: mainItem.title,
    icon: iconName
  }
  editMainNavDialogOpen.value = true
}

const handleEditMainNav = () => {
  if (editingGroupIndex.value !== null && editingMainNavId.value && mainNavForm.value.title) {
    configStore.updateNavMainItem(
      editingGroupIndex.value,
      editingMainNavId.value,
      {
        title: mainNavForm.value.title,
        icon: mainNavForm.value.icon
      }
    )
    editMainNavDialogOpen.value = false
    Message.success('主导航更新成功')
  }
}

// ============================================
// Add/Delete Sub Navigation
// ============================================

// Add Sub Nav Dialog State
const addSubNavDialogOpen = ref(false)
const addSubNavTargetGroup = ref(0)
const addSubNavTargetMainId = ref('')
const addSubNavForm = ref({ title: '', url: '#' })

const openAddSubNavDialog = (groupIndex: number, mainItemId: string) => {
  addSubNavTargetGroup.value = groupIndex
  addSubNavTargetMainId.value = mainItemId
  addSubNavForm.value = { title: '', url: '#' }
  addSubNavDialogOpen.value = true
}

const closeAddSubNavDialog = () => {
  addSubNavDialogOpen.value = false
}

const handleAddSubNav = () => {
  if (addSubNavForm.value.title) {
    const newId = configStore.addSubNavItem(
      addSubNavTargetGroup.value,
      addSubNavTargetMainId.value,
      {
        title: addSubNavForm.value.title,
        url: addSubNavForm.value.url
      }
    )
    
    // Automatically create page configuration
    if (newId) {
      configStore.addPage1Config(newId, {
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
          columns: []
        }
      })
      Message.success('导航项及页面配置创建成功')
    }
    closeAddSubNavDialog()
  }
}

// Add Main Nav Dialog State
const addMainNavDialogOpen = ref(false)
const addMainNavForm = ref({ title: '', icon: 'IconSettings' })



const closeAddMainNavDialog = () => {
  addMainNavDialogOpen.value = false
}

const handleAddMainNav = () => {
    if (addMainNavForm.value.title) {
        // Default to group 0 (Platform)
        configStore.addNavMainItem(0, {
            title: addMainNavForm.value.title,
            icon: addMainNavForm.value.icon,
            url: '',
            items: []
        })
        closeAddMainNavDialog()
    }
}

const handleDeleteSubNav = (groupIndex: number, mainItemId: string, subItemId: string, subItemTitle: string) => {
  showConfirm(
    '确定删除导航项？',
    `确定要删除导航项 "${subItemTitle}" 吗？相关的页面配置也会被删除。`,
    () => {
      configStore.deleteSubNavItem(groupIndex, mainItemId, subItemId)
      // 如果删除的是当前选中的导航项，清除选中状态
      if (selectedNavId.value === subItemId) {
        selectedNavId.value = null
      }
    }
  )
}

const handleDeleteCurrentNav = () => {
  if (!selectedNavInfo.value) return
  handleDeleteSubNav(
    selectedNavInfo.value.groupIndex,
    selectedNavInfo.value.mainItemId,
    selectedNavInfo.value.subItem.id,
    selectedNavInfo.value.subItem.title
  )
}

// ============================================
// Page Config Actions
// ============================================

const handleCreatePageConfig = () => {
  if (selectedNavId.value && !currentPageConfig.value) {
    configStore.addPage1Config(selectedNavId.value, {
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
        columns: []
      }
    })
  }
}

const handleDeletePageConfig = () => {
  if (!selectedNavId.value) return
  
  showConfirm(
    '确定要重置该页面吗？',
    '这将会：\n1. 删除当前的页面配置\n2. 将页面恢复到“开发中”状态\n\n操作后请点击顶部“写入源码”以永久生效。',
    () => configStore.deletePage1Config(selectedNavId.value!)
  )
}







// 切换区域显示状态
const toggleAreaShow = (area: 'filterArea' | 'actionsArea' | 'cardArea' | 'tableArea') => {
  if (!selectedNavId.value) return
  const config = configStore.page1Configs[selectedNavId.value]
  if (config) {
    if (area === 'filterArea') {
      config.filterArea.show = config.filterArea.show === false ? true : false
    } else if (area === 'actionsArea') {
      if (!config.actionsArea) config.actionsArea = { buttons: [] }
      config.actionsArea.show = config.actionsArea.show === false ? true : false
    } else if (area === 'cardArea') {
      if (!config.cardArea) config.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
      config.cardArea.show = config.cardArea.show === false ? true : false
    } else if (area === 'tableArea') {
      config.tableArea.show = config.tableArea.show === false ? true : false
    }
    }
  }


// 更新筛选区域配置
const handleUpdateFilterArea = (key: string, value: any) => {
  if (!selectedNavId.value) return
  const config = configStore.page1Configs[selectedNavId.value]
  if (config) {
    // @ts-ignore dynamic key access
    config.filterArea[key] = value
  }
}

// 更新表格区域配置
const handleUpdateTableArea = (key: string, value: any) => {
  if (!selectedNavId.value) return
  const config = configStore.page1Configs[selectedNavId.value]
  if (config) {
    // @ts-ignore dynamic key access
    config.tableArea[key] = value
  }
}



// ============================================
// 拖拽排序功能 (Issue 9)
// ============================================

// 筛选项列表的本地副本用于拖拽
const filterList = computed({
  get: () => currentPageConfig.value?.filterArea.filters || [],
  set: (val) => {
    if (currentPageConfig.value) {
      currentPageConfig.value.filterArea.filters = val
    }
  }
})

// 列配置列表的本地副本用于拖拽
const columnList = computed({
  get: () => currentPageConfig.value?.tableArea.columns || [],
  set: (val) => {
    if (currentPageConfig.value) {
      currentPageConfig.value.tableArea.columns = val
    }
  }
})

// 操作按钮列表的本地副本用于拖拽
const actionList = computed({
  get: () => currentPageConfig.value?.actionsArea?.buttons || [],
  set: (val) => {
    if (currentPageConfig.value) {
      if (!currentPageConfig.value.actionsArea) currentPageConfig.value.actionsArea = { buttons: [] }
      currentPageConfig.value.actionsArea.buttons = val
    }
  }
})

// 卡片列表的本地副本用于拖拽
const cardList = computed({
  get: () => currentPageConfig.value?.cardArea?.cards || [],
  set: (val) => {
    if (currentPageConfig.value) {
      if (!currentPageConfig.value.cardArea) currentPageConfig.value.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
      currentPageConfig.value.cardArea.cards = val
    }
  }
})

// ============================================
// 保存配置功能 (Issue 10: 添加 toast 通知)
// ============================================

const isSaving = ref(false)

// ============================================
// 配置导入/导出功能
// ============================================

// 隐藏的文件输入元素引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 下载 JSON 文件
const downloadJson = (data: object, filename: string) => {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}


// 导出配置
const handleExportConfig = () => {
  const exportData = configStore.exportFullConfig()
  const filename = `settings-config-${new Date().toISOString().slice(0, 10)}.json`
  downloadJson(exportData, filename)
  Message.success('配置导出成功')
}

// 导入配置
const handleImportConfig = () => {
  fileInputRef.value?.click()
}

// 待确认导入的数据
const pendingImportData = ref<any>(null)
const importConfirmDialogOpen = ref(false)

// 处理文件选择
const handleFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      // 验证新版 JSON 结构 (version 2.0)
      if (!data.version || !data.navGroups || !Array.isArray(data.navGroups)) {
        Message.error('导入失败: 无效的配置文件格式')
        return
      }
      // 检查版本
      if (data.version !== '2.0') {
        Message.warning(`版本警告: 配置文件版本 ${data.version} 可能不兼容`)
      }
      // 储存数据并显示确认对话框
      pendingImportData.value = data
      importConfirmDialogOpen.value = true
    } catch (err) {
      Message.error('导入失败: 无效的 JSON 文件格式')
    }
  }
  reader.readAsText(file)
  
  // 清空 input 以便重复选择同一文件
  input.value = ''
}

// 确认导入并同步到云端
const handleConfirmImport = async () => {
  if (!pendingImportData.value) return
  
  isSaving.value = true
  importConfirmDialogOpen.value = false
  
  try {
    const result = await configStore.importAndSyncToCloud(pendingImportData.value)
    if (result.success) {
      Message.success(result.message || '导入成功')
    } else {
      Message.error(result.message || '导入失败')
    }
  } finally {
    isSaving.value = false
    pendingImportData.value = null
  }
}

</script>

<template>
  <div class="settings-root">
      <!-- 隐藏的文件输入 -->
      <input 
        ref="fileInputRef"
        type="file" 
        accept=".json"
        class="hidden"
        @change="handleFileSelected"
      />
    
    <div class="flex flex-1">
      <!-- Left Sidebar: Navigation List -->
    <div class="w-72 border-r bg-muted/30 flex flex-col">
      <!-- Sidebar Header -->
      <div class="p-3 border-b">
        <h2 class="font-semibold text-base flex items-center gap-2">
          <Settings2 class="w-4 h-4" />
          页面配置
        </h2>
      </div>

      <!-- Navigation List -->
      <div class="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <div class="space-y-6">
          <div v-for="(group, groupIndex) in filteredNavGroups" :key="groupIndex">
            <h3 class="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
              {{ group.label || '未命名分组' }}
            </h3>
            
            <div class="space-y-1">
              <div v-for="mainItem in group.items" :key="mainItem.id" class="space-y-1">
                   <div 
                    class="px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer transition-all flex items-center justify-between group"
                    @click="toggleMainItemExpand(mainItem.id)"
                   >
                      <div class="flex items-center gap-2 flex-1 truncate">
                         <ChevronRight 
                          class="w-3.5 h-3.5 transition-transform text-muted-foreground"
                          :class="{ 'rotate-90': expandedMainItems[mainItem.id] }"
                         />
                         <span class="flex-1 truncate text-sm font-medium">{{ mainItem.title }}</span>
                      </div>
                      <div class="flex items-center gap-0.5">
                         <!-- Add Sub Item Button -->
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           class="h-6 w-6 p-0 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                           @click.stop="openAddSubNavDialog(groupIndex, mainItem.id)"
                         >
                           <Plus class="w-3.5 h-3.5"/>
                         </Button>
                         <!-- Edit Main Item Button -->
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           class="h-6 w-6 p-0 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                           @click.stop="openEditMainNavDialog(groupIndex, mainItem)"
                         >
                           <Settings2 class="w-3.5 h-3.5"/>
                         </Button>
                      </div>
                   </div>
                  
                  <!-- Sub Items - Collapsible -->
                  <div v-show="expandedMainItems[mainItem.id]">
                    <draggable
                      v-model="mainItem.items"
                      tag="div"
                      class="space-y-0.5 p-1 min-h-[10px]"
                      item-key="id"
                      :animation="200"
                      group="subItems"
                      handle=".drag-handle"
                    >
                      <template #item="{ element: subItem }">
                         <div
                          class="px-3 py-2 rounded-md cursor-pointer transition-all flex items-center justify-between group/item"
                          :class="selectedNavId === subItem.id 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
                          @click="handleSelectNav(subItem.id)"
                         >
                           <div class="flex items-center gap-2 flex-1 min-w-0">
                              <!-- Drag Handle (visible on hover) -->
                              <GripVertical class="w-3 h-3 text-muted-foreground opacity-0 group-hover/item:opacity-50 cursor-grab drag-handle" />
                              <span class="truncate text-sm">{{ subItem.title }}</span>
                           </div>
                           
                           <!-- Removed template badge -->
                         </div>
                      </template>
                    </draggable>
                    <!-- Empty state -->
                    <div v-if="!mainItem.items?.length" class="px-3 py-2 text-xs text-muted-foreground text-center">
                      暂无子导航
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          <!-- Empty Search Result -->
          <div v-if="filteredNavGroups.length === 0" class="text-center py-8 text-muted-foreground">
            <p class="text-sm">未找到匹配的导航项</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Content: Page Config Editor -->
    <div class="flex-1 flex flex-col bg-background min-w-0">
      <!-- 未选择导航时 -->
      <div v-if="!selectedNavId" class="h-full flex items-center justify-center">
        <div class="text-center text-muted-foreground">
          <Settings2 class="h-12 w-12 mx-auto opacity-30 mb-4" />
          <p>请从左侧选择一个导航项查看/编辑配置</p>
        </div>
      </div>

      <!-- 选中导航后 -->
      <div v-else class="flex flex-col flex-1">
          <!-- Header Content (Compact Breadcrumb Layout) -->
          <div class="px-4 py-2.5 border-b flex items-center justify-between shrink-0 bg-background/95 backdrop-blur z-10">
            <!-- Left: Breadcrumb Style Title -->
            <div class="flex items-center gap-2 overflow-hidden">
               <FileCode class="w-4 h-4 text-primary shrink-0" />
               <span class="text-sm font-medium truncate">{{ selectedNavInfo?.subItem.title }}</span>
               <span class="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 bg-muted rounded">{{ selectedNavId }}</span>
            </div>

             <!-- Right: All Actions in Breadcrumb -->
            <div class="flex items-center gap-1 shrink-0">
               <!-- 导入配置 -->
               <Button variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground" title="导入配置" @click="handleImportConfig">
                  <Upload class="w-3.5 h-3.5" />
               </Button>
               <!-- 导出配置 -->
                <AButton type="text" size="small" class="!h-7 !px-2 !text-xs text-muted-foreground hover:text-foreground" title="导出配置" @click="handleExportConfig">
                   <Download class="w-3.5 h-3.5" />
                </AButton>

               <!-- 分隔线 -->
               <div class="w-px h-4 bg-border mx-0.5"></div>
               
               <!-- 重命名 -->
                <AButton type="text" size="small" class="!h-7 !px-2 !text-xs text-muted-foreground hover:text-foreground" title="重命名" @click="openEditNavDialog">
                   <Pencil class="w-3.5 h-3.5" />
                </AButton>

               <!-- 更多操作 (危险操作) -->
               <ADropdown trigger="click" position="br">
                  <AButton type="text" size="small" class="!h-7 !px-2 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal class="w-3.5 h-3.5" />
                  </AButton>
                <template #content>
                  <ADoption class="!text-destructive !text-xs" @click="handleDeleteCurrentNav">
                    <Trash2 class="w-3.5 h-3.5 mr-2 inline-block" />删除导航项
                  </ADoption>
                  <ADoption class="!text-destructive !text-xs" @click="handleDeletePageConfig">
                    <RefreshCw class="w-3.5 h-3.5 mr-2 inline-block" />重置页面
                  </ADoption>
                </template>
              </ADropdown>
            </div>
          </div>

          <!-- 内容区 (Compact) -->
          <div class="p-4 space-y-4">
            <!-- 无配置时 -->
            <div v-if="!currentPageConfig" class="text-center py-8 border-2 border-dashed rounded-lg">
              <FileCode class="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p class="text-muted-foreground text-sm mb-3">该导航项还没有页面配置</p>
              <AButton type="primary" size="small" @click="handleCreatePageConfig">
                <Plus class="w-3.5 h-3.5 mr-1" />
                创建 Page1 配置
              </AButton>
            </div>

            <!-- 有配置时 -->
            <template v-else>
            <ATabs v-model:active-key="activeTab" type="card-gutter" class="w-full">
                <!-- 筛选区配置 -->
                <ATabPane key="filter" title="筛选区">
                    <div>
                    <div class="rounded-lg border bg-card mb-3">
                      <div class="p-3">
                        <!-- 布局配置与添加按钮 -->
                        <div class="flex items-center justify-between gap-4 p-2.5 bg-muted/40 rounded-md text-xs">
                          <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">每行:</label>
                              <div class="flex items-center">
                                <AInputNumber 
                                  :model-value="currentPageConfig.filterArea.columns"
                                  @update:model-value="(v: any) => handleUpdateFilterArea('columns', v)"
                                  size="small"
                                  class="w-12 text-xs rounded-r-none border-r-0 focus-visible:ring-0"
                                />
                                <div class="h-6 px-1.5 flex items-center bg-muted border rounded-r-md text-[10px] text-muted-foreground">列</div>
                              </div>
                            </div>
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">间距:</label>
                              <AInput 
                                :model-value="currentPageConfig.filterArea.gap"
                                @update:model-value="(v: any) => handleUpdateFilterArea('gap', v)"
                                size="small"
                                class="w-16 text-xs"
                                placeholder="16px"
                              />
                            </div>
                          </div>
                          <AButton type="outline" size="mini" class="px-2" @click="filterCrud.openAdd">
                            <Plus class="w-3 h-3 mr-1" />
                            添加筛选项
                          </AButton>
                        </div>
                      </div>
                        <!-- 筛选项列表 -->
                        <div class="px-3 pb-3">
                        <div class="border rounded-md" v-if="currentPageConfig.filterArea.filters.length > 0">
                        <table class="w-full border-collapse">
                          <thead>
                            <tr class="border-b bg-muted/50">
                              <th 
                                v-for="header in filterHeaders" 
                                :key="header.key"
                                class="p-2 text-xs font-medium border-r border-border/50 last:border-r-0"
                                :class="[header.align === 'right' ? 'text-right' : 'text-left', header.width]"
                              >
                                {{ header.label }}
                              </th>
                            </tr>
                          </thead>
                          <draggable 
                            v-model="filterList"
                            tag="tbody"
                            item-key="key"
                            handle=".drag-handle"
                            :animation="200"
                          >
                            <template #item="{ element: filter, index }">
                              <tr class="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                <td class="p-1.5 border-r border-border/50">
                                  <GripVertical class="w-4 h-4 text-muted-foreground cursor-grab drag-handle" />
                                </td>
                                <!-- 类型 - 下拉框 -->
                                <td class="p-1 border-r border-border/50">
                                  <ASelect 
                                    :model-value="filter.type" 
                                    @change="(v: any) => filter.type = String(v) as 'input' | 'select' | 'date-range' | 'tree-select'"
                                    size="small"
                                    class="w-full"
                                  >
                                      <AOption value="input">输入框</AOption>
                                      <AOption value="select">下拉框</AOption>
                                      <AOption value="date-range">日期范围</AOption>
                                      <AOption value="tree-select">树形选择</AOption>
                                  </ASelect>
                                </td>
                                <!-- 标签 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="filter.label" 
                                    size="small"
                                    class="w-full"
                                    placeholder="标签"
                                  />
                                </td>
                                <!-- 字段名 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="filter.key" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="key"
                                  />
                                </td>
                                <!-- 选项/配置信息 -->
                                <td class="p-1 text-xs text-muted-foreground border-r border-border/50">
                                  <div v-if="filter.type === 'select'" class="truncate max-w-[100px] px-2" title="点击编辑按钮配置选项">
                                    {{ filter.options?.length || 0 }} 个选项
                                  </div>
                                  <div v-else-if="filter.type === 'tree-select'" class="truncate max-w-[100px] px-2">
                                    树形数据
                                  </div>
                                  <div v-else class="px-2">-</div>
                                </td>
                                <!-- 操作按钮 -->
                                <td class="p-1">
                                  <div class="flex gap-0.5 justify-end">
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      :class="filter.visible === false ? 'text-muted-foreground' : 'text-foreground'"
                                      @click="filter.visible = filter.visible === false ? true : false"
                                      :title="filter.visible === false ? '点击显示' : '点击隐藏'"
                                    >
                                      <EyeOff v-if="filter.visible === false" class="w-3 h-3" />
                                      <Eye v-else class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="filterCrud.openEdit(index, filter, transformFilter)"
                                      title="高级配置"
                                    >
                                      <Settings2 class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      status="danger"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="filterCrud.handleDelete(index, '确定删除该筛选项吗？')"
                                    >
                                      <Trash2 class="w-3 h-3" />
                                    </AButton>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </draggable>
                        </table>
                      </div>
                            <div v-if="currentPageConfig.filterArea.filters.length === 0" class="flex flex-col items-center justify-center py-8 border border-dashed rounded-md bg-muted/5 mx-3 mb-3">
                          <Search class="w-5 h-5 text-muted-foreground/40 mb-2" />
                          <p class="text-xs text-muted-foreground">暂无筛选项</p>
                        </div>
                        </div>
                    </div>
                    </div>

                    <!-- Page Preview Area (Filter Tab) -->
                    <div class="mt-4 border rounded-lg bg-background shadow-sm overflow-hidden">
                       <div class="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
                         <div class="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                           <Eye class="w-3.5 h-3.5" />
                           页面预览 (筛选与操作区)
                         </div>
                       </div>
                       <div class="h-[400px] overflow-hidden relative">
                          <component 
                            :is="Page1" 
                            :key="selectedNavId" 
                            :nav-id="selectedNavId"
                            :visible-sections="['filter', 'actions']"
                            class="h-full"
                          />
                       </div>
                    </div>
                  </ATabPane>

                  <!-- 操作区配置 -->
                  <ATabPane key="actions" title="操作区">
                    <div class="rounded-lg border bg-card mb-3">
                      <div class="p-3">
                        <!-- 布局配置与添加按钮 -->
                        <div class="flex items-center justify-between gap-4 p-2.5 bg-muted/40 rounded-md text-xs">
                          <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1.5">
                               <input 
                                type="checkbox" 
                                :checked="currentPageConfig.actionsArea?.show !== false"
                                @change="toggleAreaShow('actionsArea')"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">显示操作区</label>
                            </div>
                          </div>
                          <AButton type="outline" size="mini" class="px-2" @click="actionCrud.openAdd">
                            <Plus class="w-3 h-3 mr-1" />
                            添加按钮
                          </AButton>
                        </div>
                      </div>
                        <!-- Action List -->
                        <div class="px-3 pb-3">
                        <div class="border rounded-md" v-if="currentPageConfig.actionsArea?.buttons && currentPageConfig.actionsArea.buttons.length > 0">
                        <table class="w-full border-collapse">
                          <thead>
                            <tr class="border-b bg-muted/50">
                              <th 
                                v-for="header in actionHeaders" 
                                :key="header.key"
                                class="p-2 text-xs font-medium border-r border-border/50 last:border-r-0"
                                :class="[header.align === 'right' ? 'text-right' : 'text-left', header.width]"
                              >
                                {{ header.label }}
                              </th>
                            </tr>
                          </thead>
                          <draggable 
                            v-model="actionList"
                            tag="tbody"
                            item-key="key"
                            handle=".drag-handle"
                            :animation="200"
                          >
                            <template #item="{ element: action, index }">
                              <tr class="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                <td class="p-1.5 border-r border-border/50">
                                  <GripVertical class="w-4 h-4 text-muted-foreground cursor-grab drag-handle" />
                                </td>
                                <!-- 标签 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="action.label" 
                                    size="small"
                                    class="w-full"
                                    placeholder="按钮名称"
                                  />
                                </td>
                                <!-- Key - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="action.key" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="key"
                                  />
                                </td>
                                <!-- 样式 - 下拉框 -->
                                 <td class="p-1 border-r border-border/50">
                                  <ASelect 
                                    :model-value="action.variant || 'shadcn-outline'"
                                    @change="(v: any) => action.variant = String(v) as 'primary' | 'outline' | 'text' | 'shadcn-outline'"
                                    size="small"
                                    class="w-full"
                                  >
                                      <AOption value="primary">Primary</AOption>
                                      <AOption value="outline">Outline</AOption>
                                      <AOption value="text">Text</AOption>
                                      <AOption value="shadcn-outline">Shadcn Outline</AOption>
                                  </ASelect>
                                </td>
                                <!-- 效果 - 显示文本 -->
                                <td class="p-1 border-r border-border/50">
                                   <div class="px-2 py-1 text-[10px] w-full">
                                      <span v-if="!action.effectType || action.effectType === 'none'" class="text-muted-foreground">无</span>
                                      <span v-else-if="action.effectType === 'modal'" class="text-blue-500 font-medium">弹窗: {{ action.effectConfig?.title || '未配置' }}</span>
                                   </div>
                                </td>
                                <!-- 自定义类名 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="action.className" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="class..."
                                  />
                                </td>
                                <!-- 操作按钮 -->
                                <td class="p-1">
                                  <div class="flex gap-0.5 justify-end">
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      :class="action.visible === false ? 'text-muted-foreground' : 'text-foreground'"
                                      @click="action.visible = action.visible === false ? true : false"
                                      :title="action.visible === false ? '点击显示' : '点击隐藏'"
                                    >
                                       <EyeOff v-if="action.visible === false" class="w-3 h-3" />
                                      <Eye v-else class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center text-primary hover:text-primary"
                                      @click="actionCrud.openEdit(index, action, transformAction)"
                                      title="编辑详情"
                                    >
                                      <Pencil class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      status="danger"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="actionCrud.handleDelete(index)"
                                    >
                                      <Trash2 class="w-3 h-3" />
                                    </AButton>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </draggable>
                        </table>
                      </div>
                            <div v-if="!currentPageConfig.actionsArea?.buttons || currentPageConfig.actionsArea.buttons.length === 0" class="flex flex-col items-center justify-center py-8 border border-dashed rounded-md bg-muted/5 mx-3 mb-3">
                          <MoreHorizontal class="w-5 h-5 text-muted-foreground/40 mb-2" />
                          <p class="text-xs text-muted-foreground">暂无操作按钮</p>
                        </div>
                        </div>
                    </div>

                    <!-- Page Preview Area (Actions Tab) -->
                    <div class="mt-4 border rounded-lg bg-background shadow-sm overflow-hidden">
                       <div class="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
                         <div class="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                           <Eye class="w-3.5 h-3.5" />
                           页面预览 (筛选与操作区)
                         </div>
                       </div>
                       <div class="h-[400px] overflow-hidden relative">
                          <component 
                            :is="Page1" 
                            :key="selectedNavId" 
                            :nav-id="selectedNavId"
                            :visible-sections="['filter', 'actions']"
                            class="h-full"
                          />
                       </div>
                    </div>
                  </ATabPane>

                  <!-- 卡片区配置 -->
                  <ATabPane key="card" title="卡片区">
                    <div class="rounded-lg border bg-card mb-3">
                      <div class="p-3">
                        <!-- 布局配置与添加按钮 -->
                        <div class="flex items-center justify-between gap-4 p-2.5 bg-muted/40 rounded-md text-xs">
                          <div class="flex items-center gap-4">
                            <div class="flex items-center gap-1.5">
                              <input 
                                type="checkbox" 
                                :checked="currentPageConfig.cardArea?.show !== false"
                                @change="toggleAreaShow('cardArea')"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">显示卡片区</label>
                            </div>
                            <div class="h-4 w-px bg-border"></div>
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">每行:</label>
                              <div class="flex items-center">
                                <AInputNumber 
                                  :model-value="currentPageConfig.cardArea?.columns || 4"
                                  @update:model-value="(v: any) => { if (currentPageConfig && currentPageConfig.cardArea) currentPageConfig.cardArea.columns = v }"
                                  size="small"
                                  class="w-12 text-xs rounded-r-none border-r-0 focus-visible:ring-0"
                                />
                                 <div class="h-6 px-1.5 flex items-center bg-muted border rounded-r-md text-[10px] text-muted-foreground">列</div>
                              </div>
                            </div>
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">间距:</label>
                               <AInput 
                                :model-value="currentPageConfig.cardArea?.gap || '16px'"
                                @update:model-value="(v: any) => { if (currentPageConfig && currentPageConfig.cardArea) currentPageConfig.cardArea.gap = String(v) }"
                                size="small"
                                class="w-16 text-xs"
                                placeholder="16px"
                              />
                            </div>
                          </div>
                          <AButton type="outline" size="mini" class="px-2" @click="cardCrud.openAdd">
                            <Plus class="w-3 h-3 mr-1" />
                            添加卡片
                          </AButton>
                        </div>
                      </div>
                        <!-- 卡片列表 -->
                        <div class="px-3 pb-3">
                        <div class="border rounded-md" v-if="currentPageConfig.cardArea?.cards && currentPageConfig.cardArea.cards.length > 0">
                        <table class="w-full border-collapse">
                          <thead>
                            <tr class="border-b bg-muted/50">
                              <th 
                                v-for="header in cardHeaders" 
                                :key="header.key"
                                class="p-2 text-xs font-medium border-r border-border/50 last:border-r-0"
                                :class="[header.align === 'right' ? 'text-right' : 'text-left', header.width]"
                              >
                                {{ header.label }}
                              </th>
                            </tr>
                          </thead>
                          <draggable 
                            v-model="cardList"
                            tag="tbody"
                            item-key="key"
                            handle=".drag-handle"
                            :animation="200"
                          >
                            <template #item="{ element: card, index }">
                              <tr class="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                <td class="p-1.5 border-r border-border/50">
                                  <GripVertical class="w-4 h-4 text-muted-foreground cursor-grab drag-handle" />
                                </td>
                                <!-- Key - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="card.key" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="key"
                                  />
                                </td>
                                <!-- 标题 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="card.title" 
                                    size="small"
                                    class="w-full"
                                    placeholder="标题"
                                  />
                                </td>
                                <!-- 数据 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="card.data" 
                                    size="small"
                                    class="w-full"
                                    placeholder="数据值"
                                  />
                                </td>
                                <!-- 操作按钮 -->
                                <td class="p-1">
                                  <div class="flex gap-0.5 justify-end">
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center text-primary hover:text-primary"
                                      @click="cardCrud.openEdit(index, card, transformCard)"
                                      title="编辑详情"
                                    >
                                      <Pencil class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      status="danger"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="cardCrud.handleDelete(index, '确定删除这个卡片吗？')"
                                    >
                                      <Trash2 class="w-3 h-3" />
                                    </AButton>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </draggable>
                        </table>
                      </div>
                            <div v-if="!currentPageConfig.cardArea?.cards || currentPageConfig.cardArea.cards.length === 0" class="flex flex-col items-center justify-center py-8 border border-dashed rounded-md bg-muted/5 mx-3 mb-3">
                          <Layers class="w-5 h-5 text-muted-foreground/40 mb-2" />
                          <p class="text-xs text-muted-foreground">暂无卡片配置</p>
                        </div>
                        </div>
                    </div>

                    <!-- Page Preview Area (Card Tab) -->
                    <div class="mt-4 border rounded-lg bg-background shadow-sm overflow-hidden">
                       <div class="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
                         <div class="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                           <Eye class="w-3.5 h-3.5" />
                           页面预览 (卡片区)
                         </div>
                       </div>
                       <div class="h-[400px] overflow-hidden relative">
                          <component 
                            :is="Page1" 
                            :key="selectedNavId" 
                            :nav-id="selectedNavId"
                            :visible-sections="['card']"
                            class="h-full"
                          />
                       </div>
                    </div>
                  </ATabPane>

                  <!-- 表格区配置 -->
                  <ATabPane key="table" title="表格区">
                    <div class="rounded-lg border bg-card mb-3">
                      <div class="p-3">
                        <!-- 布局配置与添加按钮 -->
                        <div class="flex items-center justify-between gap-4 p-2.5 bg-muted/40 rounded-md text-xs">
                          <div class="flex items-center gap-3 flex-wrap">
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">高度:</label>
                               <AInput 
                                :model-value="currentPageConfig.tableArea.height"
                                @update:model-value="(v: any) => handleUpdateTableArea('height', v)"
                                size="small"
                                class="w-16 text-xs"
                              />
                            </div>
                            <div class="flex items-center gap-2">
                              <label class="text-xs text-muted-foreground">每页:</label>
                               <AInputNumber 
                                :model-value="currentPageConfig.tableArea.pageSize || 15"
                                @update:model-value="(v: any) => handleUpdateTableArea('pageSize', v)"
                                size="small"
                                class="w-14 text-xs"
                              />
                              <span class="text-xs text-muted-foreground">行</span>
                            </div>
                            <div class="h-4 w-px bg-border"></div>
                            <div class="flex items-center gap-1.5">
                               <input 
                                type="checkbox" 
                                :checked="currentPageConfig.tableArea.scrollX"
                                @change="handleUpdateTableArea('scrollX', ($event.target as HTMLInputElement).checked)"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">横向滚动</label>
                            </div>
                            <div class="flex items-center gap-1.5">
                               <input 
                                type="checkbox" 
                                :checked="currentPageConfig.tableArea.scrollY"
                                @change="handleUpdateTableArea('scrollY', ($event.target as HTMLInputElement).checked)"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">纵向滚动</label>
                            </div>
                            <div class="flex items-center gap-1.5">
                               <input 
                                type="checkbox" 
                                :checked="currentPageConfig.tableArea.showCheckbox"
                                @change="handleUpdateTableArea('showCheckbox', ($event.target as HTMLInputElement).checked)"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">复选框</label>
                            </div>
                            <div class="flex items-center gap-1.5">
                               <input 
                                type="checkbox" 
                                :checked="currentPageConfig.tableArea.stickyHeader !== false"
                                @change="handleUpdateTableArea('stickyHeader', ($event.target as HTMLInputElement).checked)"
                                class="rounded border-input text-primary focus:ring-primary w-3 h-3"
                              />
                              <label class="text-xs text-muted-foreground">吸顶表头</label>
                            </div>
                          </div>
                          <AButton type="outline" size="mini" class="px-2" @click="columnCrud.openAdd">
                            <Plus class="w-3 h-3 mr-1" />
                            添加列
                          </AButton>
                        </div>
                      </div>
                        <!-- 列配置列表 -->
                        <div class="px-3 pb-3">
                        <div class="border rounded-md" v-if="currentPageConfig.tableArea.columns.length > 0">
                        <table class="w-full border-collapse">
                          <thead>
                            <tr class="border-b bg-muted/50">
                              <th 
                                v-for="header in columnHeaders" 
                                :key="header.key"
                                class="p-2 text-xs font-medium border-r border-border/50 last:border-r-0"
                                :class="[header.align === 'right' ? 'text-right' : 'text-left', header.width]"
                              >
                                {{ header.label }}
                              </th>
                            </tr>
                          </thead>
                          <draggable 
                            v-model="columnList"
                            tag="tbody"
                            item-key="key"
                            handle=".drag-handle"
                            :animation="200"
                          >
                            <template #item="{ element: col, index }">
                              <tr class="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                <td class="p-1.5 border-r border-border/50">
                                  <GripVertical class="w-4 h-4 text-muted-foreground cursor-grab drag-handle" />
                                </td>
                                <!-- 类型 - 下拉框 -->
                                <td class="p-1 border-r border-border/50">
                                  <ASelect 
                                    :model-value="col.type || 'text'"
                                    @change="(v: any) => col.type = String(v) as 'text' | 'badge' | 'status-badge' | 'text-button'"
                                    size="small"
                                    class="w-full"
                                  >
                                    <AOption value="text">文本</AOption>
                                    <AOption value="badge">Badge</AOption>
                                    <AOption value="status-badge">状态</AOption>
                                    <AOption value="text-button">按钮</AOption>
                                  </ASelect>
                                </td>
                                <!-- 标签 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="col.label" 
                                    size="small"
                                    class="w-full"
                                    placeholder="标签"
                                  />
                                </td>
                                <!-- 字段名 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="col.key" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="key"
                                  />
                                </td>
                                <!-- 宽度 - 输入框 -->
                                <td class="p-1 border-r border-border/50">
                                  <AInput 
                                    v-model="col.width" 
                                    size="small"
                                    class="w-full font-mono"
                                    placeholder="100px"
                                  />
                                </td>
                                 <!-- 格式 / 按钮配置 -->
                                 <td class="p-1 border-r border-border/50">
                                   <!-- 按钮列表: 当类型为按钮时显示 -->
                                   <AInput 
                                     v-if="col.type === 'text-button'"
                                     :model-value="col.buttons?.join(', ') || ''" 
                                     @update:model-value="(v: any) => col.buttons = String(v).split(/[，,]/).map(s => s.trim()).filter(s => s)"
                                     size="small"
                                     class="w-full"
                                     placeholder="按钮列表: 增加, 删除"
                                   />
                                   <!-- 数据格式: 其他类型显示 -->
                                   <ASelect 
                                     v-else
                                     :model-value="col.mockFormat || 'none'"
                                     @change="(v: any) => col.mockFormat = String(v) as 'none' | 'text' | 'datetime' | 'number' | 'list'"
                                     size="small"
                                     class="w-full"
                                   >
                                       <AOption value="none">无</AOption>
                                       <AOption value="text">文本</AOption>
                                       <AOption value="datetime">时间</AOption>
                                       <AOption value="number">数字</AOption>
                                       <AOption value="list">列表项目随机选择</AOption>
                                   </ASelect>
                                 </td>
                                <!-- 操作按钮 -->
                                <td class="p-1">
                                  <div class="flex gap-0.5 justify-end">
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="columnCrud.openEdit(index, col, transformColumn)"
                                      title="高级配置"
                                    >
                                      <Settings2 class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      :class="col.visible === false ? 'text-muted-foreground' : 'text-foreground'"
                                      @click="col.visible = col.visible === false ? true : false"
                                      :title="col.visible === false ? '点击显示' : '点击隐藏'"
                                    >
                                      <EyeOff v-if="col.visible === false" class="w-3 h-3" />
                                      <Eye v-else class="w-3 h-3" />
                                    </AButton>
                                    <AButton
                                      type="text"
                                      size="mini"
                                      status="danger"
                                      class="!h-6 !w-6 !p-0 flex items-center justify-center"
                                      @click="columnCrud.handleDelete(index, '确定删除该列吗？')"
                                    >
                                      <Trash2 class="w-3 h-3" />
                                    </AButton>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </draggable>
                        </table>
                      </div>
                            <div v-if="currentPageConfig.tableArea.columns.length === 0" class="flex flex-col items-center justify-center py-8 border border-dashed rounded-md bg-muted/5 mx-3 mb-3">
                          <FileCode class="w-5 h-5 text-muted-foreground/40 mb-2" />
                          <p class="text-xs text-muted-foreground">暂无表格列</p>
                        </div>
                    </div>
                    </div>
                    
                    <!-- Page Preview Area (Table Tab) -->
                    <div class="mt-4 border rounded-lg bg-background shadow-sm overflow-hidden">
                       <div class="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
                         <div class="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                           <Eye class="w-3.5 h-3.5" />
                           页面预览 (表格区)
                         </div>
                       </div>
                       <div class="h-[400px] overflow-hidden relative">
                          <component 
                            :is="Page1" 
                            :key="selectedNavId" 
                            :nav-id="selectedNavId"
                            :visible-sections="['table']"
                            class="h-full"
                          />
                       </div>
                    </div>
                  </ATabPane>
              </ATabs>
            </template>
          </div>
      </div>
      </div>
    </div>

    <!-- 编辑导航对话框 -->
  <AModal v-model:visible="editNavDialogOpen" title="编辑导航" @ok="handleEditNav" @cancel="closeEditNavDialog">
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">标题</label>
          <AInput v-model="navForm.title" placeholder="输入导航标题" />
        </div>
        <!-- Issue 4 & 5: 提示信息 -->
        <div class="flex items-start gap-2 p-3 rounded-md bg-muted/50 text-sm text-muted-foreground">
          <Info class="w-4 h-4 mt-0.5 shrink-0" />
          <p>修改将在点击顶部“写入源码”时同步保存到 sidebar.ts 文件。</p>
        </div>
      </div>
  </AModal>

  <!-- 添加/编辑筛选项对话框 -->
  <AModal 
    v-model:visible="filterCrud.dialogVisible.value" 
    :title="filterCrud.mode.value === 'edit' ? '编辑筛选项' : '添加筛选项'"
    @ok="filterCrud.handleSave" 
    @cancel="filterCrud.closeDialog"
    :width="500"
  >
    <ConfigFilterForm v-model="filterCrud.formData.value" />
  </AModal>

  <!-- 添加列对话框 -->
  <AModal 
    v-model:visible="columnCrud.dialogVisible.value" 
    :title="columnCrud.mode.value === 'edit' ? '编辑列' : '添加列'"
    @ok="columnCrud.handleSave"
    @cancel="columnCrud.closeDialog"
    :width="500"
  >
    <ConfigColumnForm v-model="columnCrud.formData.value" />
  </AModal>

  <!-- 添加/编辑操作按钮对话框 -->
  <AModal 
    v-model:visible="actionCrud.dialogVisible.value" 
    :title="actionCrud.mode.value === 'edit' ? '编辑操作按钮' : '添加操作按钮'"
    @ok="actionCrud.handleSave" 
    @cancel="actionCrud.closeDialog"
    :width="600"
  >
    <AScrollbar style="max-height: 500px; overflow: auto;" class="pr-2">
      <ConfigActionForm v-model="actionCrud.formData.value" />
    </AScrollbar>
  </AModal>

  <!-- Card Dialog -->
  <AModal
    v-model:visible="cardCrud.dialogVisible.value"
    :title="cardCrud.mode.value === 'edit' ? '编辑卡片' : '添加卡片'"
    @ok="cardCrud.handleSave"
    @cancel="cardCrud.closeDialog"
  >
    <ConfigCardForm v-model="cardCrud.formData.value" />
  </AModal>

  <!-- Add Sub Nav Dialog -->
  <AModal
    v-model:visible="addSubNavDialogOpen"
    title="添加子导航"
    @ok="handleAddSubNav"
    @cancel="closeAddSubNavDialog"
  >
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">标题</label>
          <AInput v-model="addSubNavForm.title" placeholder="请输入导航标题" />
        </div>
      </div>
  </AModal>

  <!-- Add Main Nav Dialog -->
  <AModal
    v-model:visible="addMainNavDialogOpen"
    title="添加一级导航"
    @ok="handleAddMainNav"
    @cancel="closeAddMainNavDialog"
  >
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">标题</label>
          <AInput v-model="addMainNavForm.title" placeholder="请输入导航标题" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">图标</label>
          <ASelect v-model="addMainNavForm.icon">
            <AOption v-for="icon in availableIcons" :key="icon.value" :value="icon.value">
              <template #icon><component :is="icon.component" /></template>
              {{ icon.label }}
            </AOption>
          </ASelect>
        </div>
      </div>
  </AModal>

  <!-- Edit Main Nav Dialog (Arco Card Based as requested) -->
  <AModal
    v-model:visible="editMainNavDialogOpen"
    title="编辑主导航"
    @ok="handleEditMainNav"
    @cancel="editMainNavDialogOpen = false"
  >
        <div class="space-y-5 py-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-2)]">导航标题</label>
            <AInput v-model="mainNavForm.title" placeholder="请输入导航标题" class="h-10" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-2)]">选择图标</label>
            <div class="grid grid-cols-6 gap-2 p-3 border rounded-lg bg-muted/30">
              <div 
                v-for="icon in availableIcons" 
                :key="icon.value"
                class="aspect-square flex flex-col items-center justify-center rounded-md border cursor-pointer transition-all hover:bg-primary/5 hover:border-primary/50"
                :class="mainNavForm.icon === icon.value ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-background border-transparent text-muted-foreground'"
                @click="mainNavForm.icon = icon.value"
                :title="icon.label"
              >
                <component :is="icon.component" class="w-5 h-5 mb-1" />
              </div>
            </div>
          </div>

          <div class="flex items-start gap-2 p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-blue-600">
            <Info class="w-4 h-4 mt-0.5 shrink-0" />
            <p>修改主导航的图标和标题会立即反映在预览中。点击“写入源码”可持久化到本地文件。</p>
          </div>
        </div>
  </AModal>

  <!-- Issue 7: 确认对话框 (替代 confirm()) -->
  <AModal
    v-model:visible="confirmDialogOpen"
    :title="confirmDialogTitle"
    @ok="handleConfirmAction"
    @cancel="handleCancelConfirm"
  >
        <p class="whitespace-pre-line">{{ confirmDialogDescription }}</p>
  </AModal>

  <!-- 导入确认对话框 -->
  <AModal
    v-model:visible="importConfirmDialogOpen"
    title="确认导入配置"
    @ok="handleConfirmImport"
    @cancel="importConfirmDialogOpen = false"
  >
        <p>导入配置将覆盖当前设置并同步到云端。确定要继续吗？</p>
  </AModal>

  </div>
</template>

<style scoped>
.settings-root {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Custom scrollbar for navigation */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--muted-foreground) / 0.3);
}

/* 移除输入框焦点时的灰色边框 */
:deep(input[type="text"]:focus),
:deep(input[type="text"]:focus-visible) {
  outline: none;
  box-shadow: none;
  border-color: hsl(var(--primary));
}

/* Arco 输入/文本域/选择框 样式覆盖 - 白色背景 */
:deep(.arco-input-wrapper),
:deep(.arco-textarea-wrapper),
:deep(.arco-select-view-single) {
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-neutral-3);
  border-radius: 4px;
}

:deep(.arco-input-wrapper:hover),
:deep(.arco-textarea-wrapper:hover),
:deep(.arco-select-view-single:hover) {
  background-color: var(--color-bg-2);
  border-color: rgb(var(--primary-6));
}

:deep(.arco-input-wrapper-focus),
:deep(.arco-textarea-wrapper-focus),
:deep(.arco-select-view-focus) {
  background-color: var(--color-bg-2);
  border-color: rgb(var(--primary-6));
}
</style>
