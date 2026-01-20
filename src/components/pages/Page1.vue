<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Button as AButton, Modal as AModal, Scrollbar as AScrollbar, Input as AInput, InputNumber as AInputNumber, Message } from '@arco-design/web-vue'
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { safeJsonParseWithError } from '@/utils/error'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterCard, ArcoTable } from '@/components/ui/filter'
import ConfigFilterForm from '@/components/config/ConfigFilterForm.vue'
import ConfigColumnForm from '@/components/config/ConfigColumnForm.vue'
import ConfigActionForm from '@/components/config/ConfigActionForm.vue'
import ConfigCardForm from '@/components/config/ConfigCardForm.vue'
import { useNavigation } from '@/config/schema'
import { useConfigStore, type Page1Config, type FilterConfig, type TableColumn, type ActionButtonConfig , type CardItemConfig } from '@/stores/configStore'

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
const configStore = useConfigStore()

// 编辑模式状态
const isEditMode = computed(() => configStore.isEditMode)

// --- 获取当前页面配置 ---
const pageConfig = computed<Page1Config | undefined>(() => {
  const config = configStore.getPage1Config(currentNavId.value)
  return config
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

// ============================================
// 编辑模式 - 快速编辑弹窗
// ============================================
const editDialogOpen = ref(false)
const editDialogType = ref<'filter' | 'column' | 'action' | 'card'>('filter')
const editDialogMode = ref<'add' | 'edit'>('add')
const editDialogIndex = ref(-1)

// 筛选项编辑表单
const filterEditForm = ref({
  key: '',
  type: 'input' as 'input' | 'select' | 'date-range' | 'tree-select',
  label: '',
  placeholder: '',
  options: '',
  treeOptions: '',
  visible: true
})

// 列编辑表单
const columnEditForm = ref({
  key: '',
  label: '',
  width: '120px',
  type: 'text' as 'text' | 'badge' | 'status-badge' | 'text-button',
  mockFormat: 'none' as 'none' | 'text' | 'datetime' | 'number' | 'list',
  mockList: '',
  buttons: '',
  fixed: 'none' as 'none' | 'left' | 'right',
  align: 'left' as 'left' | 'center' | 'right',
  ellipsis: false,
  tooltip: false,
  visible: true
})

// 操作按钮编辑表单
const actionEditForm = ref({
  key: '',
  label: '',
  variant: 'outline' as 'primary' | 'outline' | 'text' | 'shadcn-outline',
  className: '',
  effectType: 'none' as 'none' | 'modal',
  effectTitle: '',
  effectContent: '',
  effectFormItems: [] as any[],
  visible: true
})

// 卡片编辑表单
const cardEditForm = ref({
  key: '',
  title: '',
  data: ''
})

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
function saveAreaConfig() {
  if (!pageConfig.value) return
  const navId = currentNavId.value
  
  if (areaConfigType.value === 'filter') {
    configStore.updateFilterAreaConfig(navId, {
      columns: filterAreaConfig.value.columns,
      gap: filterAreaConfig.value.gap
    })
    configStore.updatePage1Config(navId, {
      actionsArea: { ...pageConfig.value.actionsArea, show: filterAreaConfig.value.showActions, buttons: pageConfig.value.actionsArea?.buttons ?? [] }
    })
  } else if (areaConfigType.value === 'card') {
    configStore.updatePage1Config(navId, {
      cardArea: {
        show: cardAreaConfig.value.show,
        columns: cardAreaConfig.value.columns,
        gap: cardAreaConfig.value.gap,
        cards: pageConfig.value.cardArea?.cards ?? []
      }
    })
  } else if (areaConfigType.value === 'table') {
    configStore.updateTableAreaConfig(navId, {
      height: tableAreaConfig.value.height,
      pageSize: tableAreaConfig.value.pageSize,
      scrollX: tableAreaConfig.value.scrollX,
      scrollY: tableAreaConfig.value.scrollY,
      showCheckbox: tableAreaConfig.value.showCheckbox,
      stickyHeader: tableAreaConfig.value.stickyHeader
    })
  }
  
  areaConfigDialogOpen.value = false
  Message.success('配置已更新')
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

function handleDrop(type: 'filter' | 'action' | 'column', targetIndex: number) {
  if (dragIndex.value === -1 || dragIndex.value === targetIndex || !pageConfig.value) return
  
  const navId = currentNavId.value
  
  if (type === 'filter') {
    const filters = [...pageConfig.value.filterArea.filters]
    const [removed] = filters.splice(dragIndex.value, 1)
    filters.splice(targetIndex, 0, removed)
    configStore.updateFilterAreaConfig(navId, { filters })
  } else if (type === 'action') {
    const buttons = [...(pageConfig.value.actionsArea?.buttons || [])]
    const [removed] = buttons.splice(dragIndex.value, 1)
    buttons.splice(targetIndex, 0, removed)
    configStore.updatePage1Config(navId, { actionsArea: { ...pageConfig.value.actionsArea, buttons } })
  } else if (type === 'column') {
    const columns = [...pageConfig.value.tableArea.columns]
    const [removed] = columns.splice(dragIndex.value, 1)
    columns.splice(targetIndex, 0, removed)
    configStore.updateTableAreaConfig(navId, { columns })
  }
  
  dragIndex.value = -1
  dragOverIndex.value = -1
}

function handleDragEnd() {
  dragIndex.value = -1
  dragOverIndex.value = -1
}

/**
 * 打开编辑弹窗
 * 
 * 支持新增和编辑两种模式，根据 type 参数决定编辑哪种配置项
 * 
 * @param type - 配置项类型：filter(筛选项)、column(表格列)、action(操作按钮)、card(卡片)
 * @param mode - 操作模式：add(新增) 或 edit(编辑)
 * @param index - 编辑模式下的项索引（可选）
 */
function openEditDialog(type: 'filter' | 'column' | 'action' | 'card', mode: 'add' | 'edit', index?: number) {
  editDialogType.value = type
  editDialogMode.value = mode
  editDialogIndex.value = index ?? -1
  
  if (mode === 'edit' && index !== undefined && pageConfig.value) {
    // 加载现有数据
    if (type === 'filter') {
      const item = pageConfig.value.filterArea.filters[index]
      filterEditForm.value = { 
        ...item,
        placeholder: item.placeholder || '',
        options: item.options?.join(',') || '',
        treeOptions: item.treeOptions ? JSON.stringify(item.treeOptions) : '',
        visible: item.visible ?? true
      }
    } else if (type === 'column') {
      const item = pageConfig.value.tableArea.columns[index]
      columnEditForm.value = { 
        ...item,
        type: item.type || 'text',
        width: item.width || '120px',
        // @ts-ignore
        mockFormat: item.mockFormat || 'text',
        mockList: item.mockList ? item.mockList.join(',') : '',
        buttons: item.buttons ? item.buttons.join(',') : '',
        visible: item.visible ?? true,
        fixed: item.fixed || 'none',
        align: item.align || 'left',
        ellipsis: item.ellipsis || false,
        tooltip: item.tooltip || false
      }
    } else if (type === 'action') {
      const item = pageConfig.value.actionsArea?.buttons?.[index]
      if (item) {
        actionEditForm.value = { 
          ...item,
          className: item.className || '',
          variant: (item.variant || 'outline') as any,
          effectType: item.effectType || 'none',
          effectTitle: item.effectConfig?.title || '',
          effectContent: item.effectConfig?.content || '',
          effectFormItems: item.effectConfig?.formItems || [],
          visible: item.visible ?? true
        }
      }
    } else if (type === 'card') {
      const item = pageConfig.value.cardArea?.cards?.[index]
      if (item) cardEditForm.value = { 
        ...item,
        data: String(item.data)
      }
    }
  } else {
    // 重置表单
    if (type === 'filter') {
      filterEditForm.value = { 
        key: '', type: 'input', label: '', placeholder: '', 
        options: '', treeOptions: '', visible: true 
      }
    } else if (type === 'column') {
      columnEditForm.value = { 
        key: '', label: '', width: '120px', type: 'text', 
        mockFormat: 'none', mockList: '', buttons: '',
        fixed: 'none', align: 'left', ellipsis: false, tooltip: false,
        visible: true 
      }
    } else if (type === 'action') {
      actionEditForm.value = { 
        key: '', label: '', variant: 'outline', 
        className: '', effectType: 'none', effectTitle: '', effectContent: '', effectFormItems: [],
        visible: true 
      }
    } else if (type === 'card') {
      cardEditForm.value = { key: '', title: '', data: '' }
    }
  }
  
  editDialogOpen.value = true
}

/**
 * 保存编辑内容
 * 
 * 根据当前 editDialogType 和 editDialogMode 决定操作：
 * - 新增模式：自动生成 key，追加到列表
 * - 编辑模式：更新指定索引的项
 * 
 * @remarks
 * 使用 Arco Message 组件显示操作结果
 */
function saveEdit() {
  if (!pageConfig.value) return
  
  const navId = currentNavId.value
  
  if (editDialogType.value === 'filter') {
    const filters = [...pageConfig.value.filterArea.filters]
    
    const newFilter: FilterConfig = {
      key: filterEditForm.value.key,
      type: filterEditForm.value.type,
      label: filterEditForm.value.label,
      placeholder: filterEditForm.value.placeholder,
      visible: filterEditForm.value.visible,
      options: filterEditForm.value.options ? filterEditForm.value.options.split(/[，,]/).map(s => s.trim()).filter(s => s) : [],
      treeOptions: filterEditForm.value.treeOptions ? safeJsonParseWithError(filterEditForm.value.treeOptions, '树形数据') ?? undefined : undefined
    }

    if (editDialogMode.value === 'add') {
      newFilter.key = newFilter.key || `filter_${Date.now()}`
      filters.push(newFilter)
    } else {
      filters[editDialogIndex.value] = newFilter
    }
    configStore.updateFilterAreaConfig(navId, { filters })
  } else if (editDialogType.value === 'column') {
    const columns = [...pageConfig.value.tableArea.columns]
    
    const newColumn: TableColumn = {
      key: columnEditForm.value.key,
      label: columnEditForm.value.label,
      width: columnEditForm.value.width,
      type: columnEditForm.value.type,
      visible: columnEditForm.value.visible,
      // @ts-ignore
      mockFormat: columnEditForm.value.mockFormat,
      mockList: columnEditForm.value.mockList ? columnEditForm.value.mockList.split(/[，,]/).map(s => s.trim()) : undefined,
      buttons: columnEditForm.value.buttons ? columnEditForm.value.buttons.split(/[，,]/).map(s => s.trim()) : undefined,
      fixed: columnEditForm.value.fixed === 'none' ? undefined : columnEditForm.value.fixed,
      align: columnEditForm.value.align,
      ellipsis: columnEditForm.value.ellipsis,
      tooltip: columnEditForm.value.tooltip
    }

    if (editDialogMode.value === 'add') {
      newColumn.key = newColumn.key || `col_${Date.now()}`
      columns.push(newColumn)
    } else {
      columns[editDialogIndex.value] = newColumn
    }
    configStore.updateTableAreaConfig(navId, { columns })
  } else if (editDialogType.value === 'action') {
    const buttons = [...(pageConfig.value.actionsArea?.buttons || [])]
    
    const newAction: ActionButtonConfig = {
      key: actionEditForm.value.key,
      label: actionEditForm.value.label,
      variant: actionEditForm.value.variant,
      className: actionEditForm.value.className,
      visible: actionEditForm.value.visible,
      effectType: actionEditForm.value.effectType === 'none' ? undefined : actionEditForm.value.effectType,
      effectConfig: actionEditForm.value.effectType === 'modal' ? {
        title: actionEditForm.value.effectTitle,
        content: actionEditForm.value.effectContent,
        formItems: actionEditForm.value.effectFormItems
      } : undefined
    }

    if (editDialogMode.value === 'add') {
      newAction.key = newAction.key || `action_${Date.now()}`
      buttons.push(newAction)
    } else {
      buttons[editDialogIndex.value] = newAction
    }
    configStore.updatePage1Config(navId, { actionsArea: { ...pageConfig.value.actionsArea, show: true, buttons } })
  } else if (editDialogType.value === 'card') {
    const cards = [...(pageConfig.value.cardArea?.cards || [])]
    
    const newCard: CardItemConfig = {
      key: cardEditForm.value.key,
      title: cardEditForm.value.title,
      data: cardEditForm.value.data
    }

    if (editDialogMode.value === 'add') {
      newCard.key = newCard.key || `card_${Date.now()}`
      cards.push(newCard)
    } else {
      cards[editDialogIndex.value] = newCard
    }
    configStore.updatePage1Config(navId, { 
      cardArea: { 
        ...pageConfig.value.cardArea,
        show: pageConfig.value.cardArea?.show ?? true, 
        columns: pageConfig.value.cardArea?.columns || 4, 
        gap: pageConfig.value.cardArea?.gap || '16px', 
        cards 
      } 
    })
  }
  
  editDialogOpen.value = false
  Message.success(editDialogMode.value === 'add' ? '添加成功' : '保存成功')
}

/**
 * 删除指定配置项
 * 
 * @param type - 配置项类型
 * @param index - 要删除的项索引
 * 
 * @remarks
 * 删除后会立即更新 configStore，无需手动保存
 */
function deleteItem(type: 'filter' | 'column' | 'action' | 'card', index: number) {
  if (!pageConfig.value) return
  
  const navId = currentNavId.value
  
  if (type === 'filter') {
    const filters = pageConfig.value.filterArea.filters.filter((_, i) => i !== index)
    configStore.updateFilterAreaConfig(navId, { filters })
  } else if (type === 'column') {
    const columns = pageConfig.value.tableArea.columns.filter((_, i) => i !== index)
    configStore.updateTableAreaConfig(navId, { columns })
  } else if (type === 'action') {
    const buttons = (pageConfig.value.actionsArea?.buttons || []).filter((_, i) => i !== index)
    configStore.updatePage1Config(navId, { actionsArea: { ...pageConfig.value.actionsArea, buttons } })
  } else if (type === 'card') {
    const cards = (pageConfig.value.cardArea?.cards || []).filter((_, i) => i !== index)
    configStore.updatePage1Config(navId, { 
      cardArea: { 
        show: pageConfig.value.cardArea?.show ?? true, 
        columns: pageConfig.value.cardArea?.columns || 4, 
        gap: pageConfig.value.cardArea?.gap || '16px', 
        cards 
      } 
    })
  }
  
  Message.success('删除成功')
}

// 根据 mockFormat 生成虚拟数据
function generateMockValue(col: any, index: number): string | number {
  const format = col.mockFormat
  const label = col.label
  const mockList = col.mockList
  
  // 如果 mockFormat 未定义或为 'none'，返回空字符串
  if (!format || format === 'none') {
    return ''
  }
  
  switch (format) {
    case 'list':
      if (mockList && mockList.length > 0) {
        const randomIndex = Math.floor(Math.random() * mockList.length)
        return mockList[randomIndex]
      }
      return `${label}${index + 1}`
    case 'text':
      return `${label}${index + 1}`
    case 'datetime':
      const now = new Date()
      const randomDays = Math.floor(Math.random() * 30)
      const randomHours = Math.floor(Math.random() * 24)
      const randomMinutes = Math.floor(Math.random() * 60)
      const randomSeconds = Math.floor(Math.random() * 60)
      const date = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h = String(randomHours).padStart(2, '0')
      const m = String(randomMinutes).padStart(2, '0')
      const s = String(randomSeconds).padStart(2, '0')
      return `${year}-${month}-${day} ${h}:${m}:${s}`
    case 'number':
      return Math.floor(10000 + Math.random() * 90000)
    default:
      return ''
  }
}

// 根据配置生成模拟数据
function generateMockData(): any[] {
  if (!pageConfig.value) return []
  
  const columns = pageConfig.value.tableArea.columns
  if (!columns || columns.length === 0) return []
  
  const rowCount = 20
  const data: any[] = []
  
  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, any> = { id: i + 1 }
    
    columns.forEach(col => {
      row[col.key] = generateMockValue(col, i)
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
  
  if (remainder === 0) return cols
  return cols - remainder
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
                    <AButton size="mini" type="text" status="danger" class="pointer-events-auto" @click.stop="deleteItem('filter', filterIndex)">
                      <Trash2 class="w-3 h-3" />
                    </AButton>
                  </div>
                </div>
              </template>

              <!-- 融合模式下的操作按钮 -->
              <div 
                  v-if="fusionMode && isSectionVisible('actions') && pageConfig.actionsArea?.show !== false"
                  class="flex items-end justify-end gap-3"
                  :style="{ gridColumn: `span ${actionButtonSpan}` }"
              >
                  <template v-for="(action, index) in visibleActions" :key="action.key">
                      <!-- 分隔符（在第2个按钮后添加） -->
                      <div v-if="index === 2" class="w-px h-6 bg-border mx-1"></div>
                      
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
                          <AButton size="mini" status="danger" class="!p-1 !min-w-0" @click.stop="deleteItem('action', index)">
                            <Trash2 class="w-2.5 h-2.5" />
                          </AButton>
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
                  <!-- 分隔符（在第2个按钮后添加） -->
                  <div v-if="actionIndex === 2" class="w-px h-6 bg-border mx-1"></div>
                  
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
                      <AButton size="mini" status="danger" class="!p-1 !min-w-0" @click.stop="deleteItem('action', actionIndex)">
                        <Trash2 class="w-2.5 h-2.5" />
                      </AButton>
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
                  <AButton size="mini" type="text" status="danger" @click="deleteItem('card', cardIndex)">
                    <Trash2 class="w-3 h-3" />
                  </AButton>
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
                  <AButton size="mini" type="text" status="danger" class="!px-1 !h-5" @click.stop="deleteItem('column', colIndex)">
                    <Trash2 class="w-2.5 h-2.5" />
                  </AButton>
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
      <!-- 筛选项编辑表单 -->
      <div v-if="editDialogType === 'filter'" class="space-y-4">
        <ConfigFilterForm v-model="filterEditForm" />
      </div>

      <!-- 列编辑表单 -->
      <div v-else-if="editDialogType === 'column'" class="space-y-4">
        <ConfigColumnForm v-model="columnEditForm" />
      </div>

      <!-- 操作按钮编辑表单 -->
      <div v-else-if="editDialogType === 'action'" class="space-y-4">
        <ConfigActionForm v-model="actionEditForm" />
      </div>

      <!-- 卡片编辑表单 -->
      <div v-else-if="editDialogType === 'card'" class="space-y-4">
        <ConfigCardForm v-model="cardEditForm" />
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
