<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Button as AButton, Modal as AModal, Scrollbar as AScrollbar, Input as AInput, InputNumber as AInputNumber, Message, Popconfirm as APopconfirm } from '@arco-design/web-vue'
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { safeJsonParseWithError } from '@/utils/error'
import { generateMockValue, evaluateConditionalValue } from '@/utils/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterCard, ArcoTable } from '@/components/ui/filter'
import ConfigForm from '@/views/ConfigForm.vue'
import { useNavigation } from '@/composables/useNavigation'
import { useConfigStore } from '@/stores/configStore'
import type { Page1Config, FilterConfig, TableColumn, ActionButtonConfig, CardItemConfig } from '@/types'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigCrud } from '@/composables/useConfigCrud'

// --- Props ---
const props = defineProps<{
  navId?: string
  visibleSections?: ('filter' | 'actions' | 'card' | 'table')[]
}>()

// --- 获取导航状态 ---
const { currentNavId: routeNavId } = useNavigation()

// 优先使用传入的 prop，否则使用路由中的 navId
const currentNavId = computed(() => props.navId || routeNavId.value)

// Helper: Check if a section should be visible
const isSectionVisible = (section: 'filter' | 'actions' | 'card' | 'table') => {
  if (props.visibleSections) {
    return props.visibleSections.includes(section)
  }
  return true
}

// --- 使用 Pinia store ---
const configStore = useConfigStore()  // 仅用于 isEditMode 和 filterActionFusion
const pageStore = useConfigPageStore()

// 编辑模式状态
const isEditMode = computed(() => configStore.isEditMode)

// --- 获取当前 subId 所属的一级导航标题 ---
const currentNavTitle = computed(() => pageStore.findNavTitleBySubId(currentNavId.value))

// --- 获取当前页面配置  ---
const pageConfig = computed<Page1Config | undefined>(() => {
  const navId = currentNavId.value
  
  // 从 pageStore 获取组件配置 
  const navTitle = currentNavTitle.value
  if (navTitle) {
      const subItem = pageStore.getSubPageConfig(navTitle, navId)
      if (subItem?.component) {
        return {
          ...subItem.component,
          mockData: () => []  //  不存储 mockData
        } as Page1Config
      }
  }
  
  return undefined
})

// --- 响应式数据 ---
const tableData = ref<any[]>([])

// 分页
const currentPage = ref(1)
const pageSize = computed(() => pageConfig.value?.tableArea.pageSize || 15)

// 顶部栏状态
const currentApp = ref(pageConfig.value?.topBar?.appOptions?.[0] ?? '')
const currentLang = ref(pageConfig.value?.topBar?.langOptions?.[0] ?? '')

// 从配置自动生成筛选状态
const filters = reactive<Record<string, any>>({})

// 弹窗状态
const effectModalVisible = ref(false)
const effectModalTitle = ref('')
const effectModalContent = ref('')
const effectModalFormItems = ref<any[]>([])
const effectModalFormData = reactive<Record<string, any>>({})
 
// 列表弹窗状态 (Effect Type: table)
const effectTableVisible = ref(false)
const effectTableTitle = ref('')
const effectTableColumns = ref<any[]>([])
const effectTableData = ref<any[]>([])
const effectTableShowCheckbox = ref(false)

// ============================================
// 编辑模式 - useConfigCrud 集成
// ============================================
const editDialogType = ref<'filter' | 'column' | 'action' | 'card'>('filter')

// Transform 函数：将 Store 数据转换为表单格式
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
  conditionRules: item.conditionRules ? JSON.stringify(item.conditionRules) : '',
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
  effectTableColumns: (item.effectConfig?.tableArea?.columns || []).map((col: any) => ({
    ...col,
    mockListStr: Array.isArray(col.mockList) ? col.mockList.join(',') : String(col.mockList || ''),
    conditionRulesJson: col.conditionRules ? JSON.stringify(col.conditionRules) : '[]'
  })),
  visible: item.visible ?? true
})

const transformCard = (item: any) => ({
  ...item,
  data: String(item.data)
})

// Filter CRUD
const filterCrud = useConfigCrud({
  name: '筛选项',
  defaultForm: () => ({
    key: '', type: 'input' as const, label: '', placeholder: '',
    options: '', treeOptions: '', visible: true
  }),
  doSave: async (modifying, index, form) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) {
      Message.error('无法找到当前页面所属的导航')
      return
    }
    const newFilter: FilterConfig = {
      key: form.key || `filter_${Date.now()}`,
      type: form.type,
      label: form.label,
      placeholder: form.placeholder || undefined,
      visible: form.visible,
      options: form.options ? form.options.split(/[，,]/).map((s: string) => s.trim()).filter((s: string) => s) : [],
      treeOptions: form.treeOptions ? safeJsonParseWithError(form.treeOptions, '树形数据') ?? undefined : undefined
    }
    
    // V9: 获取当前组件配置，更新后整体保存
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) {
      Message.error('页面配置不存在')
      return
    }
    
    if (modifying && index !== null) {
      component.filterArea.filters[index] = newFilter
    } else {
      component.filterArea.filters.push(newFilter)
    }
    
    const result = await pageStore.updateSubPageComponent(navTitle, subId, component)
    if (!result.success) {
      Message.error('保存失败: ' + result.message)
    }
  },
  doDelete: async (index) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) return
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) return
    
    component.filterArea.filters.splice(index, 1)
    await pageStore.updateSubPageComponent(navTitle, subId, component)
  }
})

// Column CRUD
const columnCrud = useConfigCrud({
  name: '表格列',
  defaultForm: () => ({
    key: '', label: '', width: '120px',
    type: 'text' as const, mockFormat: 'none' as const, mockList: '', conditionRules: '', buttons: '',
    fixed: 'none' as const, align: 'left' as const, ellipsis: false, tooltip: false, visible: true
  }),
  doSave: async (modifying, index, form) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) {
      Message.error('无法找到当前页面所属的导航')
      return
    }
    const newColumn: TableColumn = {
      key: form.key || `col_${Date.now()}`,
      label: form.label,
      width: form.width,
      type: form.type === 'text' ? undefined : form.type,
      visible: form.visible,
      mockFormat: (form.mockFormat as string) === 'none' ? undefined : form.mockFormat as 'text' | 'datetime' | 'number' | 'list' | 'list-order' | 'conditional' | undefined,
      mockList: ((form.mockFormat as string) === 'list' || (form.mockFormat as string) === 'list-order') ? form.mockList.split(',').map((s: string) => s.trim()).filter(Boolean) : undefined,
      conditionRules: (form.mockFormat as string) === 'conditional' && form.conditionRules ? safeJsonParseWithError(form.conditionRules, '条件格式规则') ?? undefined : undefined,
      buttons: (form.type as string) === 'text-button' && form.buttons ? form.buttons.split(/[，,]/).map((s: string) => s.trim()).filter((s: string) => s) : undefined,
      fixed: form.fixed === 'none' ? undefined : form.fixed,
      align: form.align === 'left' ? undefined : form.align,
      ellipsis: form.ellipsis || undefined,
      tooltip: form.tooltip || undefined
    }
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) {
      Message.error('页面配置不存在')
      return
    }
    
    if (modifying && index !== null) {
      component.tableArea.columns[index] = newColumn
    } else {
      component.tableArea.columns.push(newColumn)
    }
    
    const result = await pageStore.updateSubPageComponent(navTitle, subId, component)
    if (!result.success) {
      Message.error('保存失败: ' + result.message)
    }
  },
  doDelete: async (index) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) return
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) return
    
    component.tableArea.columns.splice(index, 1)
    await pageStore.updateSubPageComponent(navTitle, subId, component)
  }
})

// Action CRUD
const actionCrud = useConfigCrud({
  name: '操作按钮',
  defaultForm: () => ({
    key: '', label: '', variant: 'outline' as const, className: '',
    effectType: 'none' as const, effectTitle: '', effectContent: '', effectFormItems: [] as any[], 
    effectTableColumns: [] as any[], visible: true
  }),
  doSave: async (modifying, index, form) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) {
      Message.error('无法找到当前页面所属的导航')
      return
    }
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) {
      Message.error('页面配置不存在')
      return
    }
    
    if (!component.actionsArea) component.actionsArea = { buttons: [] }
    if (!component.actionsArea.buttons) component.actionsArea.buttons = []
    
    const newAction: ActionButtonConfig = {
      key: form.key || `action_${Date.now()}`,
      label: form.label,
      variant: form.variant,
      className: form.className || undefined,
      visible: form.visible,
      effectType: (form.effectType as string) === 'none' ? undefined : form.effectType,
      effectConfig: (form.effectType as string) === 'modal' ? {
        title: form.effectTitle, content: form.effectContent, formItems: form.effectFormItems
      } : (form.effectType as string) === 'table' ? {
        title: form.effectTitle, 
        tableArea: { columns: form.effectTableColumns },
        targetNavId: (form as any).effectConfig?.targetNavId
      } : undefined
    }
    
    if (modifying && index !== null) {
      component.actionsArea.buttons[index] = newAction
    } else {
      component.actionsArea.buttons.push(newAction)
    }
    component.actionsArea.show = true
    
    const result = await pageStore.updateSubPageComponent(navTitle, subId, component)
    if (!result.success) {
      Message.error('保存失败: ' + result.message)
    }
  },
  doDelete: async (index) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) return
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component?.actionsArea?.buttons) return
    
    component.actionsArea.buttons.splice(index, 1)
    await pageStore.updateSubPageComponent(navTitle, subId, component)
  }
})

// Card CRUD
const cardCrud = useConfigCrud({
  name: '卡片',
  defaultForm: () => ({ key: '', title: '', data: '' }),
  doSave: async (modifying, index, form) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) {
      Message.error('无法找到当前页面所属的导航')
      return
    }
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component) {
      Message.error('页面配置不存在')
      return
    }
    
    if (!component.cardArea) component.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
    if (!component.cardArea.cards) component.cardArea.cards = []
    
    const newCard: CardItemConfig = {
      key: form.key || `card_${Date.now()}`,
      title: form.title,
      data: form.data
    }
    
    if (modifying && index !== null) {
      component.cardArea.cards[index] = newCard
    } else {
      component.cardArea.cards.push(newCard)
    }
    
    const result = await pageStore.updateSubPageComponent(navTitle, subId, component)
    if (!result.success) {
      Message.error('保存失败: ' + result.message)
    }
  },
  doDelete: async (index) => {
    const navTitle = currentNavTitle.value
    const subId = currentNavId.value
    if (!navTitle) return
    
    const subItem = pageStore.getSubPageConfig(navTitle, subId)
    const component = subItem?.component
    if (!component?.cardArea?.cards) return
    
    component.cardArea.cards.splice(index, 1)
    await pageStore.updateSubPageComponent(navTitle, subId, component)
  }
})

// 当前激活的 CRUD 实例（用于弹窗绑定）
const currentCrud = computed(() => {
  switch (editDialogType.value) {
    case 'filter': return filterCrud
    case 'column': return columnCrud
    case 'action': return actionCrud
    case 'card': return cardCrud
  }
})

// Fix: Vue template does not auto-unwrap nested refs in plain objects (filterCrud.formData).
// We must use top-level aliases for v-model to work correctly in ConfigForm.
const filterEditForm = filterCrud.formData
const columnEditForm = columnCrud.formData
const actionEditForm = actionCrud.formData
const cardEditForm = cardCrud.formData



// 兼容性：保留旧的弹窗状态引用
const editDialogOpen = computed({
  get: () => currentCrud.value.dialogVisible.value,
  set: (val) => { currentCrud.value.dialogVisible.value = val }
})
const editDialogMode = computed(() => currentCrud.value.mode.value)

// 区域配置编辑弹窗
const areaConfigDialogOpen = ref(false)
const areaConfigType = ref<'filter' | 'card' | 'table'>('filter')

// 筛选区配置表单
const filterAreaConfig = ref({
  columns: 4,
  gap: '16px',
  showActions: true
})

// 卡片区配置表单
const cardAreaConfig = ref({
  show: false,
  columns: 4,
  gap: '16px'
})

// 表格区配置表单
const tableAreaConfig = ref({
  height: '400px',
  pageSize: 15,
  scrollX: false,
  scrollY: true,
  showCheckbox: false,
  stickyHeader: true
})

// 打开区域配置弹窗
function openAreaConfigDialog(type: 'filter' | 'card' | 'table') {
  areaConfigType.value = type
  if (pageConfig.value) {
    if (type === 'filter') {
      filterAreaConfig.value = {
        columns: pageConfig.value.filterArea.columns,
        gap: pageConfig.value.filterArea.gap,
        showActions: pageConfig.value.actionsArea?.show !== false
      }
    } else if (type === 'card') {
      cardAreaConfig.value = {
        show: pageConfig.value.cardArea?.show ?? false,
        columns: pageConfig.value.cardArea?.columns ?? 4,
        gap: pageConfig.value.cardArea?.gap ?? '16px'
      }
    } else if (type === 'table') {
      tableAreaConfig.value = {
        height: pageConfig.value.tableArea.height ?? '400px',
        pageSize: pageConfig.value.tableArea.pageSize ?? 15,
        scrollX: pageConfig.value.tableArea.scrollX ?? false,
        scrollY: pageConfig.value.tableArea.scrollY ?? true,
        showCheckbox: pageConfig.value.tableArea.showCheckbox ?? false,
        stickyHeader: pageConfig.value.tableArea.stickyHeader !== false
      }
    }
  }
  areaConfigDialogOpen.value = true
}

// 保存区域配置
async function saveAreaConfig() {
  const navTitle = currentNavTitle.value
  const subId = currentNavId.value
  if (!navTitle) {
    Message.error('无法找到当前页面所属的导航')
    return
  }
  
  const subItem = pageStore.getSubPageConfig(navTitle, subId)
  const component = subItem?.component
  if (!component) {
    Message.error('页面配置不存在')
    return
  }
  
  if (areaConfigType.value === 'filter') {
    component.filterArea.columns = filterAreaConfig.value.columns
    component.filterArea.gap = filterAreaConfig.value.gap
    if (!component.actionsArea) component.actionsArea = { buttons: [] }
    component.actionsArea.show = filterAreaConfig.value.showActions
  } else if (areaConfigType.value === 'card') {
    if (!component.cardArea) component.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }
    component.cardArea.show = cardAreaConfig.value.show
    component.cardArea.columns = cardAreaConfig.value.columns
    component.cardArea.gap = cardAreaConfig.value.gap
  } else if (areaConfigType.value === 'table') {
    component.tableArea.height = tableAreaConfig.value.height
    component.tableArea.pageSize = tableAreaConfig.value.pageSize
    component.tableArea.scrollX = tableAreaConfig.value.scrollX
    component.tableArea.scrollY = tableAreaConfig.value.scrollY
    component.tableArea.showCheckbox = tableAreaConfig.value.showCheckbox
    component.tableArea.stickyHeader = tableAreaConfig.value.stickyHeader
  }
  
  areaConfigDialogOpen.value = false
  const result = await pageStore.updateSubPageComponent(navTitle, subId, component)
  if (result.success) {
    Message.success('配置已更新')
  } else {
    Message.error('保存失败: ' + result.message)
  }
}

// 拖拽排序
const dragIndex = ref(-1)
const dragOverIndex = ref(-1)

function handleDragStart(index: number) {
  dragIndex.value = index
}

function handleDragOver(e: DragEvent, index: number) {
  e.preventDefault()
  dragOverIndex.value = index
}

async function handleDrop(type: 'filter' | 'action' | 'column', targetIndex: number) {
  if (dragIndex.value === -1 || dragIndex.value === targetIndex) return
  
  const navTitle = currentNavTitle.value
  const subId = currentNavId.value
  if (!navTitle) return
  
  const subItem = pageStore.getSubPageConfig(navTitle, subId)
  const component = subItem?.component
  if (!component) return
  
  // 直接在组件配置数组上操作
  if (type === 'filter') {
    const [removed] = component.filterArea.filters.splice(dragIndex.value, 1)
    component.filterArea.filters.splice(targetIndex, 0, removed)
  } else if (type === 'action') {
    if (!component.actionsArea?.buttons) return
    const [removed] = component.actionsArea.buttons.splice(dragIndex.value, 1)
    component.actionsArea.buttons.splice(targetIndex, 0, removed)
  } else if (type === 'column') {
    const [removed] = component.tableArea.columns.splice(dragIndex.value, 1)
    component.tableArea.columns.splice(targetIndex, 0, removed)
  }
  
  dragIndex.value = -1
  dragOverIndex.value = -1
  await pageStore.updateSubPageComponent(navTitle, subId, component)
}

function handleDragEnd() {
  dragIndex.value = -1
  dragOverIndex.value = -1
}

// 辅助函数：打开编辑弹窗
function openEditDialog(type: 'filter' | 'column' | 'action' | 'card', mode: 'add' | 'edit', index?: number) {
  editDialogType.value = type
  if (mode === 'add') {
    currentCrud.value.openAdd()
  } else if (index !== undefined) {
    const config = pageConfig.value
    if (!config) return
    let item: any
    let transform: any
    if (type === 'filter') {
      item = config.filterArea.filters[index]
      transform = transformFilter
    } else if (type === 'column') {
      item = config.tableArea.columns[index]
      transform = transformColumn
    } else if (type === 'action') {
      item = config.actionsArea?.buttons?.[index]
      transform = transformAction
    } else if (type === 'card') {
      item = config.cardArea?.cards?.[index]
      transform = transformCard
    }
    if (item) currentCrud.value.openEdit(index, item, transform)
  }
}

// 辅助函数：保存编辑
function saveEdit() {
  currentCrud.value.handleSave()
}

// 辅助函数：删除项目
function deleteItem(type: 'filter' | 'column' | 'action' | 'card', index: number) {
  if (type === 'filter') filterCrud.handleDelete(index)
  else if (type === 'column') columnCrud.handleDelete(index)
  else if (type === 'action') actionCrud.handleDelete(index)
  else if (type === 'card') cardCrud.handleDelete(index)
}

// 评估条件格式规则 逻辑已移至 @/utils/mock-data

// 根据配置生成模拟数据
function generateMockData(): any[] {
  if (!pageConfig.value) return []
  
  const columns = pageConfig.value.tableArea.columns
  if (!columns || columns.length === 0) return []
  
  const rowCount = 20
  const data: any[] = []
  
  // 分离条件格式列和普通列
  const normalColumns = columns.filter(col => col.mockFormat !== 'conditional')
  const conditionalColumns = columns.filter(col => col.mockFormat === 'conditional')
  
  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, any> = { id: i + 1 }
    
    // 先生成普通列的值
    normalColumns.forEach(col => {
      row[col.key] = generateMockValue(col, i)
    })
    
    // 再根据普通列的值生成条件格式列的值
    conditionalColumns.forEach(col => {
      if (col.conditionRules && col.conditionRules.length > 0) {
        row[col.key] = evaluateConditionalValue(row, col.conditionRules)
      } else {
        row[col.key] = ''
      }
    })
    
    data.push(row)
  }
  
  return data
}

// 加载数据函数
function loadData() {
  if (pageConfig.value?.mockData) {
    const mockData = pageConfig.value.mockData()
    if (mockData.length === 0) {
      tableData.value = generateMockData()
    } else {
      tableData.value = mockData
    }
  } else {
    tableData.value = generateMockData()
  }
  currentPage.value = 1
}

// 监听导航变化，重新加载数据
watch(currentNavId, () => {
  loadData()
}, { immediate: true })

// 监听配置变化，重置筛选状态并重新加载数据
watch(pageConfig, (config) => {
  if (config) {
    // 清空旧状态
    Object.keys(filters).forEach(key => delete filters[key])
    // 设置新状态
    config.filterArea.filters.forEach(filter => {
      filters[filter.key] = filter.defaultValue
    })
    // 重新加载数据（配置变化时）
    loadData()
  }
}, { immediate: true, deep: true })

// --- 计算属性 ---
const filteredData = computed(() => {
  return tableData.value
})

// 可见的筛选项
const visibleFilters = computed(() => {
  return pageConfig.value?.filterArea.filters.filter(f => f.visible !== false) || []
})

// 可见的列
const visibleColumns = computed(() => {
  return pageConfig.value?.tableArea.columns.filter(c => c.visible !== false) || []
})

// 所有可用列（用于条件格式选择）
const availableColumns = computed(() => {
  return pageConfig.value?.tableArea.columns.map(c => ({ key: c.key, label: c.label || c.key })) || []
})

// 可见的操作按钮
const visibleActions = computed(() => {
  return pageConfig.value?.actionsArea?.buttons?.filter((a: { visible?: boolean }) => a.visible !== false) || []
})

// 融合模式状态
const fusionMode = computed(() => configStore.filterActionFusion)

// 计算融合模式下按钮容器需要占据的网格列数
const actionButtonSpan = computed(() => {
  if (!pageConfig.value || !visibleFilters.value) return 1
  const cols = pageConfig.value.filterArea.columns
  const count = visibleFilters.value.length
  const remainder = count % cols
  const buttonsCount = visibleActions.value.length
  
  // 如果当前行已经满了，直接占满新的一行
  if (remainder === 0) return cols
  
  // 计算剩余可用列数
  const availableCols = cols - remainder
  
  // 估算按钮所需的“栅格列宽”
  // 一个典型的按钮加间距大约占 100-120px，栅格列宽通常在 200px 以上
  // 这里的阈值设为：1个栅格列最多放 2 个按钮
  const estimateNeededCols = Math.ceil(buttonsCount / 2)
  
  // 特殊情况：如果按钮超过 4 个，即使剩余 2 列也不建议挤在一起，直接换行
  const needsWrap = estimateNeededCols > availableCols || (buttonsCount > 4 && availableCols <= 2)
  
  // 如果剩余列数不够放按钮，则另起一行并占满全宽
  if (needsWrap) {
    return cols
  }
  
  // 否则占据剩余所有列
  return availableCols
})

// --- 方法 ---
const handleRowClick = (record: any) => {
  console.log('Row clicked:', record)
}

const handleSelectionChange = (keys: (string | number)[]) => {
  console.log('Selection changed:', keys)
}

const handleActionClick = (actionKey: string, record: any) => {
  console.log('Action clicked:', actionKey, record)
  
  const actionConfig = pageConfig.value?.actionsArea?.buttons?.find(b => b.key === actionKey)
  
  if (actionConfig?.effectType === 'modal') {
    effectModalTitle.value = actionConfig.effectConfig?.title || '提示'
    effectModalContent.value = actionConfig.effectConfig?.content || ''
    effectModalFormItems.value = actionConfig.effectConfig?.formItems || []
    
    Object.keys(effectModalFormData).forEach(key => delete effectModalFormData[key])
    effectModalFormItems.value.forEach(item => {
      effectModalFormData[item.key] = item.defaultValue
    })
    
    effectModalVisible.value = true
  } else if (actionConfig?.effectType === 'table') {
    effectTableTitle.value = actionConfig.effectConfig?.title || '数据列表'
    
    let targetColumns: any[] = []
    
    // 如果配置了关联页面 ID，则尝试获取该页面的表格配置
    if (actionConfig.effectConfig?.targetNavId) {
      const targetNavId = actionConfig.effectConfig.targetNavId
      const targetNavTitle = pageStore.findNavTitleBySubId(targetNavId)
      
      if (targetNavTitle) {
        const targetConfig = pageStore.getSubPageConfig(targetNavTitle, targetNavId)
        // 注意：这里我们需要确保引用的是 tableArea.columns
        targetColumns = targetConfig?.component?.tableArea?.columns || []
        
        if (targetColumns.length === 0) {
           Message.warning(`页面 "${targetConfig?.name || targetNavId}" 未配置表格列`)
        }
        effectTableShowCheckbox.value = targetConfig?.component?.tableArea?.showCheckbox ?? false
      } else {
         Message.warning('未找到关联页面的配置')
      }
    } else {
      // 兼容旧配置
      targetColumns = actionConfig.effectConfig?.tableArea?.columns || []
      effectTableShowCheckbox.value = actionConfig.effectConfig?.tableArea?.showCheckbox ?? false
    }
    
    effectTableColumns.value = targetColumns
    
    // 生成弹窗表格的 Mock 数据
    const mockData: any[] = []
    const columns = effectTableColumns.value
    const normalColumns = columns.filter(col => col.mockFormat !== 'conditional')
    const conditionalColumns = columns.filter(col => col.mockFormat === 'conditional')

    for (let i = 0; i < 10; i++) {
        const row: any = { id: i + 1 }
        // 先生成普通列
        normalColumns.forEach(col => {
            row[col.key] = generateMockValue(col, i)
        })
        // 再生成条件列
        conditionalColumns.forEach(col => {
          if (col.conditionRules && col.conditionRules.length > 0) {
            row[col.key] = evaluateConditionalValue(row, col.conditionRules)
          } else {
            row[col.key] = ''
          }
        })
        mockData.push(row)
    }
    effectTableData.value = mockData
    effectTableVisible.value = true
  }
}

const handleEffectModalOk = () => {
  console.log('Modal Form Submitted:', effectModalFormData)
  effectModalVisible.value = false
}
</script>

<template>
  <div class="page1-container h-full w-full">
    <div v-if="pageConfig" class="h-full flex flex-col overflow-hidden">
      <!-- 顶部操作栏 Teleport -->
      <Teleport to="#breadcrumb-actions" defer>
        <div class="flex items-center gap-4">
          <!-- topBar 选择器（如果配置了的话） -->
          <template v-if="pageConfig.topBar">
            <!-- App 选择 -->
            <Select v-if="pageConfig.topBar.appOptions" v-model="currentApp">
              <SelectTrigger class="w-[120px] h-8 text-xs">
                <SelectValue placeholder="选择应用" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="app in pageConfig.topBar.appOptions" :key="app" :value="app">
                  {{ app }}
                </SelectItem>
              </SelectContent>
            </Select>

            <!-- 语言选择 -->
            <Select v-if="pageConfig.topBar.langOptions" v-model="currentLang">
              <SelectTrigger class="w-[100px] h-8 text-xs">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="lang in pageConfig.topBar.langOptions" :key="lang" :value="lang">
                  {{ lang }}
                </SelectItem>
              </SelectContent>
            </Select>
          </template>
        </div>
      </Teleport>

      <!-- 主体内容-->
      <div 
        class="flex-1 flex flex-col p-4 gap-4"
      >
        
        <!-- 功能区 - 筛选条件 + 操作按钮 -->
        <div 
          v-if="(isSectionVisible('filter') && pageConfig.filterArea?.show !== false) || (isSectionVisible('actions') && pageConfig.actionsArea?.show !== false)"
          class="bg-background rounded-xl border shadow-sm relative"
          :class="{ 'ring-2 ring-primary/50': isEditMode }"
        >
          <!-- 编辑模式标题栏 -->
          <div v-if="isEditMode" class="flex items-center justify-between px-5 py-2 border-b bg-muted/30">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">筛选区 / 操作区</span>
              <span class="text-xs text-muted-foreground/70">({{ pageConfig.filterArea.columns }}列, 间距{{ pageConfig.filterArea.gap }})</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="openAreaConfigDialog('filter')">
                <Pencil class="w-3 h-3 mr-1" />配置
              </AButton>
              <AButton size="mini" @click="openEditDialog('filter', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加筛选
              </AButton>
              <AButton size="mini" @click="openEditDialog('action', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加按钮
              </AButton>
            </div>
          </div>
          
          <div class="p-5">
            <!-- 动态筛选表单区 -->
            <div 
              v-if="isSectionVisible('filter') && pageConfig.filterArea?.show !== false"
              class="grid"
              :class="{ 'mb-4': !fusionMode }"
              :style="{
                gridTemplateColumns: `repeat(${pageConfig.filterArea.columns}, 1fr)`,
                gap: pageConfig.filterArea.gap,
              }"
            >
              <template v-for="(config, filterIndex) in visibleFilters" :key="config.key">
                <!-- 带编辑覆盖层的筛选项容器 -->
                <div 
                  class="relative group/filter"
                  :class="[
                    { 'cursor-move': isEditMode },
                    { 'ring-2 ring-primary/30 ring-offset-1': isEditMode && dragOverIndex === filterIndex }
                  ]"
                  :draggable="isEditMode"
                  @dragstart="handleDragStart(filterIndex)"
                  @dragover="(e) => handleDragOver(e, filterIndex)"
                  @drop="handleDrop('filter', filterIndex)"
                  @dragend="handleDragEnd"
                >
                  <!-- 输入框类型 -->
                  <FilterInput
                    v-if="config.type === 'input'"
                    :label="config.label"
                    v-model="filters[config.key]"
                    :placeholder="config.placeholder"
                  />
                  
                  <!-- 下拉框类型 -->
                  <FilterSelect
                    v-else-if="config.type === 'select'"
                    :label="config.label"
                    v-model="filters[config.key]"
                    :options="config.options ?? []"
                  />

                  <!-- 日期范围选择类型 -->
                  <FilterDateRange
                    v-else-if="config.type === 'date-range'"
                    :label="config.label"
                    v-model="filters[config.key]"
                  />

                  <!-- 树形下拉框类型 -->
                  <FilterTreeSelect
                    v-else-if="config.type === 'tree-select'"
                    :label="config.label"
                    v-model="filters[config.key]"
                    :options="config.treeOptions ?? []"
                    :placeholder="config.placeholder"
                  />

                  <!-- 编辑模式悬浮操作 -->
                  <div 
                    v-if="isEditMode"
                    class="absolute inset-0 bg-primary/5 opacity-0 group-hover/filter:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md pointer-events-none"
                  >
                    <AButton size="mini" type="text" class="pointer-events-auto" @click.stop="openEditDialog('filter', 'edit', filterIndex)">
                      <Pencil class="w-3 h-3" />
                    </AButton>
                    <APopconfirm content="确定要删除该筛选项吗?" @ok="deleteItem('filter', filterIndex)">
                      <AButton size="mini" type="text" status="danger" class="pointer-events-auto" @click.stop>
                        <Trash2 class="w-3 h-3" />
                      </AButton>
                    </APopconfirm>
                  </div>
                </div>
              </template>

              <!-- 融合模式下的操作按钮 -->
              <div 
                  v-if="fusionMode && isSectionVisible('actions') && pageConfig.actionsArea?.show !== false"
                  class="flex items-center justify-end gap-3"
                  :style="{ gridColumn: `span ${actionButtonSpan}` }"
              >
                  <template v-for="(action, index) in visibleActions" :key="action.key">
                      <!-- 按钮容器 -->
                      <div class="relative group/action">
                        <Button 
                            v-if="action.variant === 'shadcn-outline'"
                            variant="outline"
                            class="h-9 px-5"
                            :class="action.className"
                            @click="handleActionClick(action.key, null)"
                        >
                            {{ action.label }}
                        </Button>
                        <AButton 
                            v-else
                            :type="action.variant as any ?? 'outline'"
                            class="h-9 px-5"
                            :class="action.className"
                            @click="handleActionClick(action.key, null)"
                        >
                            {{ action.label }}
                        </AButton>
                        
                        <!-- 编辑模式悬浮操作 -->
                        <div 
                          v-if="isEditMode"
                          class="absolute -top-1 -right-1 opacity-0 group-hover/action:opacity-100 transition-opacity flex gap-0.5"
                        >
                          <AButton size="mini" type="primary" class="!p-1 !min-w-0" @click.stop="openEditDialog('action', 'edit', index)">
                            <Pencil class="w-2.5 h-2.5" />
                          </AButton>
                          <APopconfirm content="确定要删除该操作按钮吗?" @ok="deleteItem('action', index)">
                            <AButton size="mini" status="danger" class="!p-1 !min-w-0" @click.stop>
                              <Trash2 class="w-2.5 h-2.5" />
                            </AButton>
                          </APopconfirm>
                        </div>
                      </div>
                  </template>
              </div>
            </div>

            <!-- 底部操作按钮 (非融合模式) -->
            <div 
              v-if="!fusionMode && isSectionVisible('actions') && pageConfig.actionsArea?.show !== false" 
              class="flex items-center justify-end pt-2 border-t"
            >
              <div class="flex items-center gap-3">
                <template v-for="(action, actionIndex) in visibleActions" :key="action.key">
                  <!-- 按钮容器 -->
                  <div class="relative group/action">
                    <Button 
                      v-if="action.variant === 'shadcn-outline'"
                      variant="outline"
                      class="h-9 px-5"
                      :class="action.className"
                      @click="handleActionClick(action.key, null)"
                    >
                      {{ action.label }}
                    </Button>
                    <AButton 
                      v-else
                      :type="action.variant as any ?? 'outline'"
                      class="h-9 px-5"
                      :class="action.className"
                      @click="handleActionClick(action.key, null)"
                    >
                      {{ action.label }}
                    </AButton>
                    
                    <!-- 编辑模式悬浮操作 -->
                    <div 
                      v-if="isEditMode"
                      class="absolute -top-1 -right-1 opacity-0 group-hover/action:opacity-100 transition-opacity flex gap-0.5"
                    >
                      <AButton size="mini" type="primary" class="!p-1 !min-w-0" @click.stop="openEditDialog('action', 'edit', actionIndex)">
                        <Pencil class="w-2.5 h-2.5" />
                      </AButton>
                      <APopconfirm content="确定要删除该操作按钮吗?" @ok="deleteItem('action', actionIndex)">
                        <AButton size="mini" status="danger" class="!p-1 !min-w-0" @click.stop>
                          <Trash2 class="w-2.5 h-2.5" />
                        </AButton>
                      </APopconfirm>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片区 (显示时) -->
        <div 
          v-if="isSectionVisible('card') && pageConfig.cardArea?.show"
          class="relative"
          :class="{ 'ring-2 ring-primary/50 rounded-xl p-2': isEditMode }"
        >
          <!-- 编辑模式标题栏 -->
          <div v-if="isEditMode" class="flex items-center justify-between px-3 py-2 mb-2">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">卡片区 ({{ pageConfig.cardArea.cards?.length || 0 }} 个)</span>
              <span class="text-xs text-muted-foreground/70">({{ pageConfig.cardArea.columns }}列, 间距{{ pageConfig.cardArea.gap }})</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="openAreaConfigDialog('card')">
                <Pencil class="w-3 h-3 mr-1" />配置
              </AButton>
              <AButton size="mini" @click="openEditDialog('card', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加卡片
              </AButton>
            </div>
          </div>
          
          <div 
            class="grid"
            :style="{
              gridTemplateColumns: `repeat(${pageConfig.cardArea.columns}, 1fr)`,
              gap: pageConfig.cardArea.gap,
            }"
          >
            <template v-for="(card, cardIndex) in pageConfig.cardArea.cards" :key="card.key">
              <div class="relative group/card">
                <FilterCard
                  :title="card.title"
                  :data="card.data"
                  :height="pageConfig.cardArea.cardHeight"
                  :width="pageConfig.cardArea.cardWidth"
                />
                <!-- 编辑模式悬浮操作 -->
                <div 
                  v-if="isEditMode"
                  class="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md"
                >
                  <AButton size="mini" type="text" @click="openEditDialog('card', 'edit', cardIndex)">
                    <Pencil class="w-3 h-3" />
                  </AButton>
                  <APopconfirm content="确定要删除该卡片吗?" @ok="deleteItem('card', cardIndex)">
                    <AButton size="mini" type="text" status="danger" @click.stop>
                      <Trash2 class="w-3 h-3" />
                    </AButton>
                  </APopconfirm>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 卡片区占位符 (隐藏时，仅编辑模式显示) -->
        <div 
          v-else-if="isEditMode && isSectionVisible('card')"
          class="border-2 border-dashed border-muted-foreground/30 rounded-xl p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-muted-foreground">
              <span class="text-sm font-medium">卡片区 (已隐藏)</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="openAreaConfigDialog('card')">
                <Pencil class="w-3 h-3 mr-1" />显示卡片区
              </AButton>
            </div>
          </div>
        </div>

        <!-- 列表区 - 使用 ArcoTable 组件 -->
        <div 
          v-if="isSectionVisible('table') && pageConfig.tableArea?.show !== false"
          class="flex-1 flex flex-col"
          :class="[
            { 'shrink-0': !pageConfig.tableArea.scrollY },
            { 'ring-2 ring-primary/50 rounded-xl': isEditMode }
          ]"
        >
          <!-- 编辑模式标题栏 -->
          <div v-if="isEditMode" class="flex items-center justify-between px-4 py-2 border-b bg-muted/30 rounded-t-xl">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">表格区 ({{ visibleColumns.length }} 列)</span>
              <span class="text-xs text-muted-foreground/70">
                (每页{{ pageConfig.tableArea.pageSize || 15 }}条, 
                {{ pageConfig.tableArea.scrollY ? '纵向滚动' : '无纵滚' }}, 
                {{ pageConfig.tableArea.showCheckbox ? '有复选框' : '无复选框' }})
              </span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="openAreaConfigDialog('table')">
                <Pencil class="w-3 h-3 mr-1" />配置
              </AButton>
              <AButton size="mini" @click="openEditDialog('column', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加列
              </AButton>
            </div>
          </div>
          
          <ArcoTable
            :columns="visibleColumns"
            :data="filteredData"
            :show-checkbox="pageConfig.tableArea.showCheckbox"
            :page-size="pageSize"
            :height="pageConfig.tableArea.scrollY ? '100%' : pageConfig.tableArea.height"
            :scroll-x="pageConfig.tableArea.scrollX"
            :scroll-y="pageConfig.tableArea.scrollY"
            :sticky-header="pageConfig.tableArea.stickyHeader !== false"
            :bordered="{ wrapper: true, cell: true }"
            class="h-full flex-1"
            :class="{ 'rounded-b-xl overflow-hidden': isEditMode }"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            @action-click="handleActionClick"
          >
            <!-- 自定义表头 (支持拖拽和编辑) -->
            <template v-for="(col, colIndex) in visibleColumns" :key="col.key" #[`header-${col.key}`]>
              <div 
                class="flex items-center gap-2 relative group/column h-full w-full"
                :class="{ 'cursor-move': isEditMode }"
                :draggable="isEditMode"
                @dragstart="handleDragStart(colIndex)"
                @dragover="(e) => handleDragOver(e, colIndex)"
                @drop="handleDrop('column', colIndex)"
                @dragend="handleDragEnd"
              >
                <span>{{ col.label }}</span>
                
                <!-- 编辑模式悬浮操作 -->
                <div 
                  v-if="isEditMode"
                  class="absolute -right-2 top-1/2 -translate-y-1/2 bg-background border shadow-sm rounded flex items-center p-0.5 opacity-0 group-hover/column:opacity-100 transition-opacity z-10"
                >
                  <AButton size="mini" type="text" class="!px-1 !h-5" @click.stop="openEditDialog('column', 'edit', colIndex)">
                    <Pencil class="w-2.5 h-2.5" />
                  </AButton>
                  <div class="w-px h-3 bg-border mx-0.5"></div>
                  <APopconfirm content="确定要删除该列吗?" @ok="deleteItem('column', colIndex)">
                    <AButton size="mini" type="text" status="danger" class="!px-1 !h-5" @click.stop>
                      <Trash2 class="w-2.5 h-2.5" />
                    </AButton>
                  </APopconfirm>
                </div>

                <!-- 拖拽指示器 -->
                <div v-if="isEditMode && dragOverIndex === colIndex" class="absolute left-0 top-0 bottom-0 w-0.5 bg-primary z-20"></div>
              </div>
            </template>
          </ArcoTable>
        </div>
      </div>
    </div>

    <!-- 无配置时显示占位 -->
    <div v-else class="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p class="text-lg font-medium">配置未找到</p>
        <p class="text-sm">Config ID: {{ currentNavId }}</p>
        <p class="text-xs text-muted-foreground mt-2">请检查配置导入日志</p>
    </div>

    <!-- 效果弹窗 -->
    <AModal
      v-model:visible="effectModalVisible"
      :title="effectModalTitle"
      @ok="handleEffectModalOk"
      @cancel="effectModalVisible = false"
      :width="520"
    >
      <AScrollbar style="max-height: 400px; overflow: auto;" class="pr-2">
        <div v-if="effectModalContent" class="whitespace-pre-wrap py-2 text-sm leading-6 mb-4">
          {{ effectModalContent }}
        </div>

        <!-- 动态表单 -->
        <div v-if="effectModalFormItems.length > 0" class="space-y-4 py-2">
          <template v-for="config in effectModalFormItems" :key="config.key">
            <FilterInput
              v-if="config.type === 'input'"
              :label="config.label"
              v-model="effectModalFormData[config.key]"
              :placeholder="config.placeholder"
            />
            
            <FilterSelect
              v-else-if="config.type === 'select'"
              :label="config.label"
              v-model="effectModalFormData[config.key]"
              :options="config.options ?? []"
            />

            <FilterDateRange
              v-else-if="config.type === 'date-range'"
              :label="config.label"
              v-model="effectModalFormData[config.key]"
            />

            <FilterTreeSelect
              v-else-if="config.type === 'tree-select'"
              :label="config.label"
              v-model="effectModalFormData[config.key]"
              :options="config.treeOptions ?? []"
              :placeholder="config.placeholder"
            />
          </template>
        </div>
      </AScrollbar>
    </AModal>

    <!-- 编辑弹窗 -->
    <AModal
      v-model:visible="editDialogOpen"
      :title="editDialogMode === 'add' ? '添加' + (editDialogType === 'filter' ? '筛选项' : editDialogType === 'column' ? '列' : editDialogType === 'action' ? '按钮' : '卡片') : '编辑' + (editDialogType === 'filter' ? '筛选项' : editDialogType === 'column' ? '列' : editDialogType === 'action' ? '按钮' : '卡片')"
      @ok="saveEdit"
      @cancel="editDialogOpen = false"
      :width="480"
    >
      <div v-if="editDialogType === 'filter'" class="space-y-4">
        <ConfigForm type="filter" v-model="filterEditForm" />
      </div>

      <!-- 列编辑表单 -->
      <div v-else-if="editDialogType === 'column'" class="space-y-4">
        <ConfigForm type="column" v-model="columnEditForm" :available-columns="availableColumns" />
      </div>

      <!-- 操作按钮编辑表单 -->
      <div v-else-if="editDialogType === 'action'" class="space-y-4">
        <ConfigForm type="action" v-model="actionEditForm" />
      </div>

      <!-- 卡片编辑表单 -->
      <div v-else-if="editDialogType === 'card'" class="space-y-4">
        <ConfigForm type="card" v-model="cardEditForm" />
      </div>
    </AModal>
 
    <!-- 表格弹窗 (Effect Type: table) -->
    <AModal
      v-model:visible="effectTableVisible"
      :title="effectTableTitle"
      @ok="effectTableVisible = false"
      :width="800"
      :footer="false"
    >
      <div class="h-[400px]">
        <ArcoTable
          :columns="effectTableColumns"
          :data="effectTableData"
          :show-checkbox="effectTableShowCheckbox"
          :page-size="5"
          height="100%"
          :bordered="{ wrapper: true, cell: true }"
        />
      </div>
    </AModal>
     <!-- 区域配置弹窗 -->
    <AModal
      v-model:visible="areaConfigDialogOpen"
      :title="areaConfigType === 'filter' ? '筛选区配置' : areaConfigType === 'card' ? '卡片区配置' : '表格区配置'"
      @ok="saveAreaConfig"
      @cancel="areaConfigDialogOpen = false"
      :width="480"
    >
      <!-- 筛选区配置 -->
      <div v-if="areaConfigType === 'filter'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">每行列数</label>
            <AInputNumber v-model="filterAreaConfig.columns" :min="1" :max="6" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">间距</label>
            <AInput v-model="filterAreaConfig.gap" placeholder="如: 16px" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="showActions" v-model="filterAreaConfig.showActions" class="rounded" />
          <label for="showActions" class="text-sm">显示操作区</label>
        </div>
      </div>

      <!-- 卡片区配置 -->
      <div v-else-if="areaConfigType === 'card'" class="space-y-4">
        <div class="flex items-center gap-2 pb-2 border-b">
          <input type="checkbox" id="showCard" v-model="cardAreaConfig.show" class="rounded" />
          <label for="showCard" class="text-sm font-medium">显示卡片区</label>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">每行列数</label>
            <AInputNumber v-model="cardAreaConfig.columns" :min="1" :max="6" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">间距</label>
            <AInput v-model="cardAreaConfig.gap" placeholder="如: 16px" />
          </div>
        </div>
      </div>

      <!-- 表格区配置 -->
      <div v-else-if="areaConfigType === 'table'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">表格高度</label>
            <AInput v-model="tableAreaConfig.height" placeholder="如: 400px" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">每页条数</label>
            <AInputNumber v-model="tableAreaConfig.pageSize" :min="5" :max="100" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="scrollX" v-model="tableAreaConfig.scrollX" class="rounded" />
            <label for="scrollX" class="text-sm">横向滚动</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="scrollY" v-model="tableAreaConfig.scrollY" class="rounded" />
            <label for="scrollY" class="text-sm">纵向滚动</label>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="showCheckbox" v-model="tableAreaConfig.showCheckbox" class="rounded" />
            <label for="showCheckbox" class="text-sm">显示复选框</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="stickyHeader" v-model="tableAreaConfig.stickyHeader" class="rounded" />
            <label for="stickyHeader" class="text-sm">吸顶表头</label>
          </div>
        </div>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
/* Page1 组件样式已移至 ArcoTable 组件 */
</style>
