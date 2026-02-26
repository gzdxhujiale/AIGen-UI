<script setup lang="ts">
defineOptions({ name: 'PageList' })
import { computed, reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Button as AButton, Modal as AModal, Scrollbar as AScrollbar, Input as AInput, InputNumber as AInputNumber, Message, Popconfirm as APopconfirm, Drawer as ADrawer, Select as ASelect, Option as AOption, RadioGroup as ARadioGroup, Radio as ARadio } from '@arco-design/web-vue'
import { debounce } from 'lodash-es'
import { Pencil, Plus, Trash2, File } from 'lucide-vue-next'
import { safeJsonParseWithError } from '@/utils/error'
import { generateMockValue, evaluateConditionalValue } from '@/utils/mock-data'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterRadio, FilterCheckbox, FilterCard, ArcoTable } from '@/components/ui/filter'
import ConfigForm from '@/views/ConfigForm.vue'
import PageForm from '@/views/page_form.vue'
import { useNavigation } from '@/composables/useNavigation'
import { useConfigStore } from '@/stores/configStore'
import type { Page1Config, TableColumn, Page1ConfigData, ActionButtonConfig } from '@/types'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigCrud } from '@/composables/useConfigCrud'

// --- Props & Route ---
const props = defineProps<{ navId?: string; visibleSections?: ('filter' | 'actions' | 'card' | 'table')[] }>()
const { currentNavId: routeNavId, detailTargetNavId, setDetailTitle } = useNavigation()
const currentNavId = computed(() => props.navId || detailTargetNavId.value || routeNavId.value)

// --- Stores ---
const configStore = useConfigStore()
const pageStore = useConfigPageStore()
const isEditMode = computed(() => configStore.isEditMode)
const currentNavTitle = computed(() => pageStore.findNavTitleBySubId(currentNavId.value))

// --- UI State Management ---
const uiState = reactive({
  tableData: [] as any[],
  currentPage: 1,
  filters: {} as Record<string, any>,
  // Modals
  effect: { visible: false, title: '', content: '', formItems: [] as any[], data: {} as Record<string, any>, fullscreen: false },
  table: { visible: false, title: '', columns: [] as any[], data: [] as any[], showCheckbox: false },
  drawer: { visible: false, title: '', targetNavId: '', targetPageType: 'list' as 'list' | 'form' },
  area: { visible: false, type: 'filter' as 'filter' | 'card' | 'table' | 'column' | 'action', config: {} as any },
  // Drag & Drop
  drag: { index: -1, overIndex: -1 }
})
const configFormRef = ref<InstanceType<typeof ConfigForm> | null>(null)

const pageConfig = computed<Page1Config | undefined>(() => {
  const navTitle = currentNavTitle.value
  if (navTitle) {
    const subItem = pageStore.getSubPageConfig(navTitle, currentNavId.value)
    if (subItem?.component) return { ...subItem.component, mockData: () => [] } as Page1Config
  }
  return (configStore.isInPreviewMode ? configStore.previewConfig : undefined) ?? undefined
})

// --- Mock Data Engine ---
const mockHelper = {
  generate(config: Page1Config | any[], rowCount = 20) {
    const cols = Array.isArray(config) ? config : (config as Page1Config).tableArea.columns
    if (!cols?.length) return []
    const normal = cols.filter(c => (c.mockFormat as string || 'none') !== 'conditional')
    const conditional = cols.filter(c => (c.mockFormat as string) === 'conditional')
    return Array.from({ length: rowCount }, (_, i) => {
      const row: Record<string, unknown> = { id: i + 1 }
      normal.forEach((c: TableColumn) => row[c.key] = generateMockValue(c, i))
      conditional.forEach((c: TableColumn) => row[c.key] = c.conditionRules ? evaluateConditionalValue(row, c.conditionRules) : '')
      return row
    })
  },
  load() {
    if (!pageConfig.value) { uiState.tableData = []; uiState.currentPage = 1; return }
    if (pageConfig.value.tableArea?.isEmptyData) {
      uiState.tableData = []
    } else {
      uiState.tableData = pageConfig.value.mockData?.().length ? pageConfig.value.mockData() : this.generate(pageConfig.value)
    }
    uiState.currentPage = 1
  }
}

// --- CRUD Config & Transformers ---
const transformers: Record<string, (item: any) => any> = {
  filter: (item: any) => ({ ...item, placeholder: item.placeholder || '', options: item.options || [], treeOptions: item.treeOptions ? JSON.stringify(item.treeOptions) : '', visible: item.visible ?? true, multiple: item.multiple ?? false, precision: item.precision || '', disabled: item.disabled || false }),
  column: (item: any) => ({ ...item, type: item.type || 'text', width: item.width || '120px', mockFormat: item.mockFormat || 'none', mockList: item.mockList || [], mockDigits: item.mockDigits || 5, conditionRules: item.conditionRules ? JSON.stringify(item.conditionRules) : '', buttons: item.buttons || [], visible: item.visible ?? true, fixed: item.fixed || 'none', align: item.align || 'left' }),
  action: (item: any) => ({ ...item, className: item.className || '', variant: item.variant || 'outline', effectType: item.effectType || 'none', effectTitle: item.effectConfig?.title || '', effectContent: item.effectConfig?.content || '', effectFormItems: (item.effectConfig?.formItems || []).map((fi: any) => ({ ...fi, multiple: fi.multiple ?? false })), effectTableColumns: (item.effectConfig?.tableArea?.columns || []).map((col: any) => ({ ...col, mockListStr: col.mockList?.join(',') || '', conditionRulesJson: col.conditionRules ? JSON.stringify(col.conditionRules) : '[]' })), visible: item.visible ?? true }),
  card: (item: any) => ({ ...item, data: String(item.data) })
}

const crudHandlers = {
  filter: useConfigCrud({ name: '筛选项', defaultForm: () => ({ key: '', type: 'input', label: '', placeholder: '', options: [] as string[], treeOptions: '', visible: true, multiple: false, precision: '', disabled: false }), doSave: async (m, i, f) => _saveComponentAction(item => { const opts = f.options as any; const nf: any = { key: f.key || `f_${Date.now()}`, type: f.type, label: f.label, placeholder: f.placeholder || undefined, visible: f.visible, multiple: f.multiple, precision: ['date', 'date-range'].includes(f.type) && f.precision ? f.precision : undefined, disabled: f.disabled || undefined, options: Array.isArray(opts) ? opts : (opts ? String(opts).split(/[，,]/).map((s: string) => s.trim()).filter(Boolean) : []), treeOptions: f.treeOptions ? safeJsonParseWithError(f.treeOptions, '树形') : undefined }; if (m && i !== null) item.filterArea.filters[i] = nf; else item.filterArea.filters.push(nf) }), doDelete: (i) => _saveComponentAction(item => item.filterArea.filters.splice(i, 1)) }),
  column: useConfigCrud({ name: '列', defaultForm: () => ({ key: '', label: '', width: '120px', type: 'text', mockFormat: 'none', mockList: [] as string[], mockDigits: 5, conditionRules: '', buttons: [] as string[], fixed: 'none', align: 'left', visible: true }), doSave: async (m, i, f) => _saveComponentAction(item => { const ml = f.mockList as any; const btns = f.buttons as any; const nc: any = { key: f.key || `c_${Date.now()}`, label: f.label, width: f.width, type: f.type === 'text' ? undefined : f.type, visible: f.visible, mockFormat: f.mockFormat === 'none' ? undefined : f.mockFormat, mockList: ['list', 'list-order'].includes(f.mockFormat) ? (Array.isArray(ml) ? ml : (ml ? String(ml).split(',').map((s: string) => s.trim()).filter(Boolean) : [])) : undefined, mockDigits: f.mockFormat === 'random-number' ? f.mockDigits : undefined, conditionRules: f.mockFormat === 'conditional' && f.conditionRules ? safeJsonParseWithError(f.conditionRules, '条件') : undefined, buttons: f.type === 'text-button' ? (Array.isArray(btns) ? btns : (btns ? String(btns).split(/[，,]/).map((s: string) => s.trim()).filter(Boolean) : [])) : undefined, fixed: f.fixed === 'none' ? undefined : f.fixed, align: f.align === 'left' ? undefined : f.align }; if (m && i !== null) item.tableArea.columns[i] = nc; else item.tableArea.columns.push(nc) }), doDelete: (i) => _saveComponentAction(item => item.tableArea.columns.splice(i, 1)) }),
  action: useConfigCrud({ name: '按钮', defaultForm: () => ({ key: '', label: '', variant: 'outline', className: '', effectType: 'none', effectTitle: '', effectContent: '', effectFormItems: [], effectTableColumns: [], visible: true }), doSave: async (m, i, f) => _saveComponentAction(item => { if (!item.actionsArea) item.actionsArea = { buttons: [], show: true }; const na: any = { key: f.key || `a_${Date.now()}`, label: f.label, variant: f.variant, className: f.className || undefined, visible: f.visible, effectType: f.effectType === 'none' ? undefined : f.effectType, effectConfig: ['modal', 'page'].includes(f.effectType) ? { title: f.effectTitle, content: f.effectContent, formItems: f.effectFormItems, targetNavId: (f as any).targetNavId || (f as any).effectConfig?.targetNavId } : ['table', 'drawer'].includes(f.effectType) ? { title: f.effectTitle, targetNavId: (f as any).targetNavId || (f as any).effectConfig?.targetNavId } : undefined }; if (m && i !== null) item.actionsArea!.buttons[i] = na; else item.actionsArea!.buttons.push(na) }), doDelete: (i) => _saveComponentAction(item => item.actionsArea!.buttons.splice(i, 1)) }),
  card: useConfigCrud({ name: '卡片', defaultForm: () => ({ key: '', title: '', data: '' }), doSave: async (m, i, f) => _saveComponentAction(item => { if (!item.cardArea) item.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }; const nc = { key: f.key || `cd_${Date.now()}`, title: f.title, data: f.data }; if (m && i !== null) item.cardArea!.cards[i] = nc; else item.cardArea!.cards.push(nc) }), doDelete: (i) => _saveComponentAction(item => item.cardArea!.cards.splice(i, 1)) })
}

const _saveComponentAction = async (updateFn: (item: Page1ConfigData) => void) => {
  const navTitle = currentNavTitle.value, subId = currentNavId.value
  if (!navTitle) return Message.error('未找到导航')
  const item = pageStore.getSubPageConfig(navTitle, subId)
  if (!item?.component) return Message.error('配置不存在')
  updateFn(item.component)
  const res = await pageStore.updateSubPageComponent(navTitle, subId, item.component)
  if (res.success) { Message.success({ content: '已保存', duration: 1500 }); mockHelper.load() }
  else Message.error('保存失败: ' + res.message)
}

// --- Action & UI Logic ---
const actions = {
  handleAction(key: string, _record?: any) {
    const config = pageConfig.value?.actionsArea?.buttons?.find(b => b.key === key)
    if (!config) return
    if (['modal', 'page'].includes(config.effectType as string)) {
      if (config.effectType === 'page') {
        const title = config.effectConfig?.title || '新页面'
        const targetNavId = config.effectConfig?.targetNavId || null
        // Use the new setDetailTitle signature: title, key, type, targetNavId
        setDetailTitle(title, config.key, 'page', targetNavId)
        return
      }

      const ec = config.effectConfig
      Object.assign(uiState.effect, { visible: true, title: ec?.title || '提示', content: ec?.content || '', formItems: ec?.formItems || [], data: {}, fullscreen: false })
      uiState.effect.formItems.forEach((f: any) => uiState.effect.data[f.key] = f.defaultValue)
    } else if (config.effectType === 'table') {
      const targetId = config.effectConfig?.targetNavId
      const targetTitle = targetId ? pageStore.findNavTitleBySubId(targetId) : null
      const targetCfg = targetId && targetTitle ? pageStore.getSubPageConfig(targetTitle, targetId) : null
      const cols = targetCfg?.component?.tableArea?.columns || []
      Object.assign(uiState.table, { visible: true, title: (config.effectConfig as any)?.title || '列表', columns: cols, showCheckbox: targetCfg?.component?.tableArea?.showCheckbox || false, data: mockHelper.generate(cols, 10) })
      if (!cols.length) Message.warning('未配置数据列')
    } else if (config.effectType === 'drawer') {
      const targetId = config.effectConfig?.targetNavId
      if (!targetId) return Message.warning('未配置关联页面')
      const targetTitle = pageStore.findNavTitleBySubId(targetId)
      const targetCfg = targetTitle ? pageStore.getSubPageConfig(targetTitle, targetId) : null
      const targetPageType = targetCfg?.pageType || 'list'
      Object.assign(uiState.drawer, { visible: true, title: (config.effectConfig as any)?.title || '详情', targetNavId: targetId, targetPageType })
    }
  },
  openAreaConfig(type: 'filter' | 'card' | 'table') {
    uiState.area.type = type
    const cfg = pageConfig.value
    if (!cfg) return
    if (type === 'filter') {
      uiState.area.config = { columns: cfg.filterArea.columns, gap: cfg.filterArea.gap, showActions: cfg.actionsArea?.show !== false }
    } else if (type === 'card') {
      uiState.area.config = { show: cfg.cardArea?.show ?? false, columns: cfg.cardArea?.columns ?? 4, gap: cfg.cardArea?.gap ?? '16px' }
    } else {
      const isFixed = !!cfg.tableArea.height
      uiState.area.config = { 
        height: cfg.tableArea.height || '400px', 
        pageSize: cfg.tableArea.pageSize ?? 10, 
        scrollX: !!cfg.tableArea.scrollX, 
        scrollY: !!cfg.tableArea.scrollY, 
        showCheckbox: !!cfg.tableArea.showCheckbox, 
        stickyHeader: cfg.tableArea.stickyHeader !== false, 
        isEmptyData: !!cfg.tableArea.isEmptyData,
        draggable: !!cfg.tableArea.draggable,
        sortableColumns: cfg.tableArea.sortableColumns || [],
        filterableColumns: cfg.tableArea.filterableColumns || [],
        heightMode: isFixed ? 'fixed' : 'pagination'
      }
    }
    uiState.area.visible = true
  },
  async saveAreaConfig() {
    await _saveComponentAction(item => {
      const { type, config } = uiState.area
      if (type === 'filter') { item.filterArea.columns = config.columns; item.filterArea.gap = config.gap; if (!item.actionsArea) item.actionsArea = { buttons: [] }; item.actionsArea.show = config.showActions }
      else if (type === 'card') { if (!item.cardArea) item.cardArea = { show: true, columns: 4, gap: '16px', cards: [] }; item.cardArea.show = config.show; item.cardArea.columns = config.columns; item.cardArea.gap = config.gap }
      else { 
        const isFixed = config.heightMode === 'fixed'
        item.tableArea.height = isFixed ? config.height : undefined;
        item.tableArea.pageSize = config.pageSize;
        item.tableArea.scrollX = config.scrollX; 
        item.tableArea.scrollY = isFixed; 
        item.tableArea.showCheckbox = config.showCheckbox; 
        item.tableArea.stickyHeader = config.stickyHeader; 
        item.tableArea.isEmptyData = config.isEmptyData;
        item.tableArea.draggable = config.draggable;
        item.tableArea.sortableColumns = config.sortableColumns;
        item.tableArea.filterableColumns = config.filterableColumns;
      }
    })
    uiState.area.visible = false
  },
  drag: {
    start(i: number) { uiState.drag.index = i },
    over(e: DragEvent, i: number) { e.preventDefault(); uiState.drag.overIndex = i },
    async drop(type: 'filter' | 'action' | 'column', target: number, from?: number) {
      const source = from !== undefined ? from : uiState.drag.index
      if (source === -1 || source === target) return
      await _saveComponentAction(item => {
        const arr = type === 'filter' ? item.filterArea.filters : type === 'action' ? item.actionsArea!.buttons : item.tableArea.columns
        const [removed] = arr.splice(source, 1)
        arr.splice(target, 0, removed)
      })
      this.end()
    },
    end() { uiState.drag.index = -1; uiState.drag.overIndex = -1 }
  }
}

// --- Computed & Watch ---
const isSectionVisible = (s: string) => props.visibleSections?.includes(s as any) ?? true
const visibleFilters = computed(() => pageConfig.value?.filterArea.filters.filter(f => f.visible !== false) || [])
const visibleColumns = computed(() => {
  if (!pageConfig.value) return []
  return pageConfig.value.tableArea.columns
    .filter(c => c.visible !== false)
    .map(c => ({
      ...c,
      sortable: pageConfig.value?.tableArea.sortableColumns?.includes(c.key) || false,
      filterable: pageConfig.value?.tableArea.filterableColumns?.includes(c.key) || false
    }))
})
const visibleActions = computed(() => pageConfig.value?.actionsArea?.buttons?.filter((a: ActionButtonConfig) => a.visible !== false) || [])
const actionButtonSpan = computed(() => {
  if (!pageConfig.value) return 1
  const cols = pageConfig.value.filterArea.columns
  // 如果按钮超过2个，强制换行（占满整行）
  if (visibleActions.value.length > 2) return cols
  
  const count = visibleFilters.value.length
  const rem = count % cols
  if (rem === 0) return cols
  const avail = cols - rem
  return (avail < 1) ? cols : avail 
})
const availableColumns = computed(() => pageConfig.value?.tableArea.columns.map(c => ({ key: c.key, label: c.label || c.key })) || [])

watch(currentNavId, () => mockHelper.load(), { immediate: true })
watch(pageConfig, (c) => {
  if (c) {
    Object.keys(uiState.filters).forEach(k => delete uiState.filters[k])
    c.filterArea.filters.forEach(f => {
      const dv = f.defaultValue
      if (f.type === 'date-range' || f.type === 'checkbox') {
        uiState.filters[f.key] = Array.isArray(dv) ? dv : []
      } else if (f.type === 'select' || f.type === 'tree-select') {
        if (f.multiple !== false) {
          uiState.filters[f.key] = Array.isArray(dv) ? dv : []
        } else {
          uiState.filters[f.key] = Array.isArray(dv) ? (dv[0] || '') : (dv ?? '')
        }
      } else {
        uiState.filters[f.key] = dv ?? ''
      }
    })
    mockHelper.load()
  }
}, { immediate: true })

const currentCrud = computed(() => {
  const type = uiState.area.type
  if (type === 'filter') return crudHandlers.filter
  if (type === 'column') return crudHandlers.column
  if (type === 'action') return crudHandlers.action
  if (type === 'card') return crudHandlers.card
  return crudHandlers.filter
})

const editor = {
  open: (type: keyof typeof crudHandlers, mode: 'add' | 'edit', i?: number) => {
    uiState.area.type = type
    if (mode === 'add') crudHandlers[type].openAdd()
    else {
      const item = type === 'filter' ? pageConfig.value?.filterArea.filters[i!] : type === 'column' ? pageConfig.value?.tableArea.columns[i!] : type === 'action' ? pageConfig.value?.actionsArea?.buttons?.[i!] : pageConfig.value?.cardArea?.cards?.[i!]
      if (item) crudHandlers[type].openEdit(i!, item, transformers[type as string])
    }
  },
  delete: (type: keyof typeof crudHandlers, i: number) => crudHandlers[type].handleDelete(i)
}

const handleColumnResize = debounce((dataIndex: string, width: number) => {
  if (!isEditMode.value) return
  const navTitle = currentNavTitle.value
  const subId = currentNavId.value
  
  if (navTitle) {
      pageStore.updateTableColumn(navTitle, subId, dataIndex, { width: width + 'px' })
  }
}, 300)
</script>

<template>
  <div class="page1-container">
    <div v-if="pageConfig" class="">
      <div class="p-4 flex flex-col gap-4">
        <!-- 功能区 - 筛选条件 + 操作按钮 -->
        <div 
          v-if="(isSectionVisible('filter') && pageConfig.filterArea?.show !== false) || (isSectionVisible('actions') && pageConfig.actionsArea?.show !== false)"
          class="relative transition-all duration-300"
          :class="isEditMode ? 'bg-background rounded-xl border shadow-sm ring-2 ring-primary/50' : 'border-b border-border/60 pb-2'"
        >
          <div v-if="isEditMode" class="flex items-center justify-between px-5 py-2 border-b bg-muted/30">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">筛选区 / 操作区</span>
              <span class="text-xs text-muted-foreground/70">({{ pageConfig.filterArea.columns }}列, 间距{{ pageConfig.filterArea.gap }})</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="actions.openAreaConfig('filter')">
                <Pencil class="w-3 h-3 mr-1" />配置
              </AButton>
              <AButton size="mini" @click="editor.open('filter', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加筛选
              </AButton>
              <AButton size="mini" @click="editor.open('action', 'add')">
                <Plus class="w-3 h-3 mr-1" />添加按钮
              </AButton>
            </div>
          </div>
          
          <div :class="isEditMode ? 'p-5' : 'py-3 px-1'">
            <div 
              v-if="isSectionVisible('filter') && pageConfig.filterArea?.show !== false"
              class="grid"
              :class="{ 'mb-4': !configStore.filterActionFusion }"
              :style="{ gridTemplateColumns: `repeat(${pageConfig.filterArea.columns}, 1fr)`, gap: pageConfig.filterArea.gap }"
            >
              <template v-for="(config, filterIndex) in visibleFilters" :key="config.key">
                <div 
                  class="relative group/filter transition-opacity"
                  :class="[
                    { 'cursor-move': isEditMode },
                    { 'ring-2 ring-primary/30 ring-offset-1': isEditMode && uiState.drag.overIndex === filterIndex },
                    { 'opacity-40': isEditMode && uiState.drag.index === filterIndex }
                  ]"
                  :draggable="isEditMode"
                  @dragstart="actions.drag.start(filterIndex)"
                  @dragover="(e) => actions.drag.over(e, filterIndex)"
                  @drop="actions.drag.drop('filter', filterIndex)"
                  @dragend="actions.drag.end"
                >
                  <FilterInput v-if="config.type === 'input'" :label="config.label" v-model="uiState.filters[config.key]" :placeholder="config.placeholder" :disabled="config.disabled" />
                  <FilterSelect v-else-if="config.type === 'select'" :label="config.label" v-model="uiState.filters[config.key]" :options="config.options ?? []" :placeholder="config.placeholder" :multiple="config.multiple !== false" :disabled="config.disabled" />
                  <FilterDateRange v-else-if="config.type === 'date-range'" :label="config.label" v-model="uiState.filters[config.key]" :precision="config.precision" :disabled="config.disabled" />
                  <FilterDateRange v-else-if="config.type === 'date'" :label="config.label" v-model="uiState.filters[config.key]" mode="single" :precision="config.precision" :disabled="config.disabled" />
                  <FilterTreeSelect v-else-if="config.type === 'tree-select'" :label="config.label" v-model="uiState.filters[config.key]" :options="config.treeOptions ?? []" :placeholder="config.placeholder" :multiple="config.multiple" :disabled="config.disabled" />
                  <FilterRadio v-else-if="config.type === 'radio'" :label="config.label" v-model="uiState.filters[config.key]" :options="config.options ?? []" />
                  <FilterCheckbox v-else-if="config.type === 'checkbox'" :label="config.label" v-model="uiState.filters[config.key]" :options="config.options ?? []" />

                  <div v-if="isEditMode" class="absolute right-1 top-1 opacity-0 group-hover/filter:opacity-100 transition-opacity bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5 pointer-events-auto">
                    <AButton size="mini" type="text" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-primary transition-colors" @click.stop="editor.open('filter', 'edit', filterIndex)">
                      <Pencil class="w-3.5 h-3.5" />
                    </AButton>
                    <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                    <APopconfirm content="确定要删除该筛选项吗?" @ok="editor.delete('filter', filterIndex)">
                      <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-destructive transition-colors" @click.stop>
                        <Trash2 class="w-3.5 h-3.5" />
                      </AButton>
                    </APopconfirm>
                  </div>
                </div>
              </template>

              <div v-if="configStore.filterActionFusion && isSectionVisible('actions') && pageConfig.actionsArea?.show !== false" class="flex items-center justify-end gap-3" :style="{ gridColumn: `span ${actionButtonSpan}` }">
                <template v-for="(action, index) in visibleActions" :key="action.key">
                  <div class="relative group/action">
                    <Button v-if="action.variant === 'shadcn-outline'" variant="outline" class="h-9 px-5" :class="action.className" @click="actions.handleAction(action.key)">{{ action.label }}</Button>
                    <AButton v-else :type="action.variant as any ?? 'outline'" class="h-9 px-5" :class="action.className" @click="actions.handleAction(action.key)">{{ action.label }}</AButton>
                    <div v-if="isEditMode" class="absolute -top-2 -right-2 opacity-0 group-hover/action:opacity-100 transition-opacity bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                      <AButton size="mini" type="text" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-primary transition-colors" @click.stop="editor.open('action', 'edit', index)">
                        <Pencil class="w-3.5 h-3.5" />
                      </AButton>
                      <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                      <APopconfirm content="确定要删除该操作按钮吗?" @ok="editor.delete('action', index)">
                        <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-destructive transition-colors" @click.stop>
                          <Trash2 class="w-3.5 h-3.5" />
                        </AButton>
                      </APopconfirm>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="!configStore.filterActionFusion && isSectionVisible('actions') && pageConfig.actionsArea?.show !== false" class="flex items-center justify-end pt-2 border-t">
              <div class="flex items-center gap-3">
                <template v-for="(action, index) in visibleActions" :key="action.key">
                  <div class="relative group/action">
                    <Button v-if="action.variant === 'shadcn-outline'" variant="outline" class="h-9 px-5" :class="action.className" @click="actions.handleAction(action.key)">{{ action.label }}</Button>
                    <AButton v-else :type="action.variant as any ?? 'outline'" class="h-9 px-5" :class="action.className" @click="actions.handleAction(action.key)">{{ action.label }}</AButton>
                    <div v-if="isEditMode" class="absolute -top-2 -right-2 opacity-0 group-hover/action:opacity-100 transition-opacity bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                      <AButton size="mini" type="text" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-primary transition-colors" @click.stop="editor.open('action', 'edit', index)">
                        <Pencil class="w-3.5 h-3.5" />
                      </AButton>
                      <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                      <APopconfirm content="确定要删除该操作按钮吗?" @ok="editor.delete('action', index)">
                        <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-destructive transition-colors" @click.stop>
                          <Trash2 class="w-3.5 h-3.5" />
                        </AButton>
                      </APopconfirm>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片区 -->
        <div v-if="isSectionVisible('card') && pageConfig.cardArea?.show" class="relative" :class="{ 'ring-2 ring-primary/50 rounded-xl p-2': isEditMode }">
          <div v-if="isEditMode" class="flex items-center justify-between px-3 py-2 mb-2">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">卡片区 ({{ pageConfig.cardArea.cards?.length || 0 }} 个)</span>
              <span class="text-xs text-muted-foreground/70">({{ pageConfig.cardArea.columns }}列, 间距{{ pageConfig.cardArea.gap }})</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="actions.openAreaConfig('card')"><Pencil class="w-3 h-3 mr-1" />配置</AButton>
              <AButton size="mini" @click="editor.open('card', 'add')"><Plus class="w-3 h-3 mr-1" />添加卡片</AButton>
            </div>
          </div>
          
          <div class="grid" :style="{ gridTemplateColumns: `repeat(${pageConfig.cardArea.columns}, 1fr)`, gap: pageConfig.cardArea.gap }">
            <template v-for="(card, cardIndex) in pageConfig.cardArea.cards" :key="card.key">
              <div class="relative group/card">
                <FilterCard :title="card.title" :data="card.data" :height="pageConfig.cardArea.cardHeight" :width="pageConfig.cardArea.cardWidth" />
                <div v-if="isEditMode" class="absolute right-2 top-2 opacity-0 group-hover/card:opacity-100 transition-opacity bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                  <AButton size="mini" type="text" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-primary transition-colors" @click.stop="editor.open('card', 'edit', cardIndex)">
                    <Pencil class="w-3.5 h-3.5" />
                  </AButton>
                  <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                  <APopconfirm content="确定要删除该卡片吗?" @ok="editor.delete('card', cardIndex)">
                    <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-destructive transition-colors" @click.stop>
                      <Trash2 class="w-3.5 h-3.5" />
                    </AButton>
                  </APopconfirm>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-else-if="isEditMode && isSectionVisible('card')" class="border-2 border-dashed border-muted-foreground/30 rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-muted-foreground">卡片区 (已隐藏)</span>
            <AButton size="mini" type="text" @click="actions.openAreaConfig('card')"><Pencil class="w-3 h-3 mr-1" />显示卡片区</AButton>
          </div>
        </div>

        <!-- 列表区 -->
        <div v-if="isSectionVisible('table') && pageConfig.tableArea?.show !== false" class="flex flex-col" :class="[{ 'shrink-0': !pageConfig.tableArea.scrollY }, { 'ring-2 ring-primary/50 rounded-xl': isEditMode }]">
          <div v-if="isEditMode" class="flex items-center justify-between px-4 py-2 border-b bg-muted/30 rounded-t-xl">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-muted-foreground">表格区 ({{ visibleColumns.length }} 列)</span>
              <span class="text-xs text-muted-foreground/70">({{ pageConfig.tableArea.pageSize || 10 }}条/页, {{ pageConfig.tableArea.scrollY ? '纵滚' : '无纵滚' }})</span>
            </div>
            <div class="flex items-center gap-2">
              <AButton size="mini" type="text" @click="actions.openAreaConfig('table')"><Pencil class="w-3 h-3 mr-1" />配置</AButton>
              <AButton size="mini" @click="editor.open('column', 'add')"><Plus class="w-3 h-3 mr-1" />添加列</AButton>
            </div>
          </div>
          
          <ArcoTable
            :columns="visibleColumns"
            :data="uiState.tableData"
            :config="{
              scroll: { 
                x: pageConfig.tableArea.scrollX, 
                y: pageConfig.tableArea.scrollY,
                stickyHeader: pageConfig.tableArea.stickyHeader !== false
              },
              selection: { 
                enabled: pageConfig.tableArea.showCheckbox 
              },
              drag: { 
                column: isEditMode, 
                row: pageConfig.tableArea.draggable 
              },
              pagination: { 
                pageSize: pageConfig.tableArea.pageSize 
              },
              layout: { 
                bordered: { wrapper: true, cell: true },
                height: pageConfig.tableArea.height
              },
              column: { 
                resizable: isEditMode 
              },
              emptyData: pageConfig.tableArea.isEmptyData
            }"
            @action-click="actions.handleAction"
            @column-resize="handleColumnResize"
            @column-reorder="(from, to) => actions.drag.drop('column', to, from)"
          >
            <template v-for="col in visibleColumns" :key="col.key" #[`header-${col.key}`]>
              <span class="truncate line-clamp-1 pr-2">{{ col.label }}</span>
              <!-- Header Actions: Hidden by default, shown on TH hover via CSS -->
              <div v-if="isEditMode" class="header-actions absolute right-1 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                <AButton size="mini" type="text" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-primary transition-colors" @click.stop="editor.open('column', 'edit', visibleColumns.findIndex(c => c.key === col.key))">
                  <Pencil class="w-3.5 h-3.5" />
                </AButton>
                <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                <APopconfirm content="确定要删除该列吗?" @ok="editor.delete('column', visibleColumns.findIndex(c => c.key === col.key))">
                  <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6 !text-muted-foreground hover:!text-destructive transition-colors" @click.stop>
                    <Trash2 class="w-3.5 h-3.5" />
                  </AButton>
                </APopconfirm>
              </div>
            </template>
          </ArcoTable>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 py-20">
      <div class="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
        <File class="w-8 h-8 opacity-30" />
      </div>
      <div class="text-center space-y-1">
        <p class="text-sm font-medium">暂无页面配置</p>
        <p class="text-xs text-muted-foreground/60">可通过 AI 助手快速生成，或进入编辑模式手动创建</p>
      </div>
    </div>

    <!-- 效果弹窗 (Modal) -->
    <AModal v-model:visible="uiState.effect.visible" :title="uiState.effect.title" @ok="uiState.effect.visible = false" :width="520" :fullscreen="uiState.effect.fullscreen">
      <AScrollbar style="max-height: 400px; overflow: auto;" class="pr-2">
        <div v-if="uiState.effect.content" class="whitespace-pre-wrap py-2 text-sm leading-6 mb-4">{{ uiState.effect.content }}</div>
        <div v-if="uiState.effect.formItems.length > 0" class="space-y-4 py-2">
          <template v-for="config in uiState.effect.formItems" :key="config.key">
            <FilterInput v-if="config.type === 'input'" :label="config.label" v-model="uiState.effect.data[config.key]" :placeholder="config.placeholder" :disabled="config.disabled" />
            <FilterSelect v-else-if="config.type === 'select'" :label="config.label" v-model="uiState.effect.data[config.key]" :options="config.options ?? []" :multiple="config.multiple !== false" :disabled="config.disabled" />
            <FilterDateRange v-else-if="config.type === 'date-range'" :label="config.label" v-model="uiState.effect.data[config.key]" :precision="config.precision" :disabled="config.disabled" />
            <FilterDateRange v-else-if="config.type === 'date'" :label="config.label" v-model="uiState.effect.data[config.key]" mode="single" :precision="config.precision" :disabled="config.disabled" />
            <FilterTreeSelect v-else-if="config.type === 'tree-select'" :label="config.label" v-model="uiState.effect.data[config.key]" :options="config.treeOptions ?? []" :placeholder="config.placeholder" :multiple="config.multiple" :disabled="config.disabled" />
            <FilterRadio v-else-if="config.type === 'radio'" :label="config.label" v-model="uiState.effect.data[config.key]" :options="config.options ?? []" />
            <FilterCheckbox v-else-if="config.type === 'checkbox'" :label="config.label" v-model="uiState.effect.data[config.key]" :options="config.options ?? []" />
          </template>
        </div>
      </AScrollbar>
    </AModal>

    <!-- 效果弹窗 (Table) -->
    <AModal v-model:visible="uiState.table.visible" :title="uiState.table.title" @ok="uiState.table.visible = false" :width="800" :footer="false">
      <div class="h-[400px]">
        <ArcoTable :columns="uiState.table.columns" :data="uiState.table.data" :show-checkbox="uiState.table.showCheckbox" :page-size="5" height="100%" :bordered="{ wrapper: true, cell: true }" />
      </div>
    </AModal>

    <!-- 效果抽屉 (Drawer) -->
    <ADrawer v-model:visible="uiState.drawer.visible" :title="uiState.drawer.title" width="80%" :footer="false">
      <div v-if="uiState.drawer.visible && uiState.drawer.targetNavId" class="h-full">
         <PageForm v-if="uiState.drawer.targetPageType === 'form'" :nav-id="uiState.drawer.targetNavId" />
         <PageList v-else :nav-id="uiState.drawer.targetNavId" :visible-sections="['filter', 'actions', 'table', 'card']" />
      </div>
    </ADrawer>

    <!-- 配置编辑弹窗 -->
    <AModal 
      v-if="currentCrud"
      v-model:visible="currentCrud.dialogVisible.value" 
      :title="(currentCrud.mode.value === 'add' ? '添加' : '编辑') + currentCrud.name" 
      @before-ok="(done: (closed: boolean) => void) => { if (configFormRef?.validate()) { currentCrud!.handleSave(); done(true) } else { done(false) } }"
      :width="480"
    >
      <ConfigForm ref="configFormRef" :type="uiState.area.type as any" v-model="currentCrud.formData.value" :available-columns="availableColumns" />
    </AModal>

    <!-- 区域配置弹窗 -->
    <AModal v-model:visible="uiState.area.visible" :title="uiState.area.type === 'filter' ? '筛选区配置' : uiState.area.type === 'card' ? '卡片区配置' : '表格区配置'" @ok="actions.saveAreaConfig" :width="uiState.area.type === 'table' ? 600 : 480">
      <div v-if="uiState.area.type === 'filter'" class="space-y-4 text-left">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="text-sm font-medium mb-1.5 block">每行列数</label><AInputNumber v-model="uiState.area.config.columns" :min="1" :max="6" /></div>
          <div><label class="text-sm font-medium mb-1.5 block">间距</label><AInput v-model="uiState.area.config.gap" placeholder="如: 16px" /></div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="showActions" v-model="uiState.area.config.showActions" class="rounded" />
          <label for="showActions" class="text-sm">显示操作区</label>
        </div>
      </div>

      <div v-else-if="uiState.area.type === 'card'" class="space-y-4 text-left">
        <div class="flex items-center gap-2 pb-2 border-b"><input type="checkbox" id="showCard" v-model="uiState.area.config.show" class="rounded" /><label for="showCard" class="text-sm font-medium">显示卡片区</label></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="text-sm font-medium mb-1.5 block">每行列数</label><AInputNumber v-model="uiState.area.config.columns" :min="1" :max="6" /></div>
          <div><label class="text-sm font-medium mb-1.5 block">间距</label><AInput v-model="uiState.area.config.gap" placeholder="如: 16px" /></div>
        </div>
      </div>

      <div v-else-if="uiState.area.type === 'table'" class="space-y-4 text-left">
        <div class="space-y-2">
           <label class="text-sm font-medium block">高度控制</label>
           <ARadioGroup v-model="uiState.area.config.heightMode" type="button">
             <ARadio value="pagination">按页行数 (自适应高度)</ARadio>
             <ARadio value="fixed">固定高度 (内容滚动)</ARadio>
           </ARadioGroup>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div v-if="uiState.area.config.heightMode === 'fixed'">
             <label class="text-sm font-medium mb-1.5 block">表格高度</label>
             <AInput v-model="uiState.area.config.height" placeholder="如: 400px" />
          </div>
          <div v-else>
             <label class="text-sm font-medium mb-1.5 block">每页条数</label>
             <AInputNumber v-model="uiState.area.config.pageSize" :min="5" :max="100" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2"><input type="checkbox" id="scrollX" v-model="uiState.area.config.scrollX" class="rounded" /><label for="scrollX" class="text-sm">横向滚动</label></div>
          <div v-if="uiState.area.config.heightMode === 'fixed'" class="flex items-center gap-2 opacity-50 cursor-not-allowed">
             <input type="checkbox" checked disabled class="rounded" />
             <label class="text-sm">纵向滚动 (固定高度强制开启)</label>
          </div>
          <div v-else class="flex items-center gap-2 opacity-50 cursor-not-allowed">
             <input type="checkbox" disabled class="rounded" />
             <label class="text-sm">纵向滚动 (自适应高度禁用)</label>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2"><input type="checkbox" id="showCheckbox" v-model="uiState.area.config.showCheckbox" class="rounded" /><label for="showCheckbox" class="text-sm">显示复选框</label></div>
          <div class="flex items-center gap-2"><input type="checkbox" id="stickyHeader" v-model="uiState.area.config.stickyHeader" class="rounded" /><label for="stickyHeader" class="text-sm">吸顶表头</label></div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2"><input type="checkbox" id="isEmptyData" v-model="uiState.area.config.isEmptyData" class="rounded" /><label for="isEmptyData" class="text-sm">是否空数据</label></div>
          <div class="flex items-center gap-2"><input type="checkbox" id="draggable" v-model="uiState.area.config.draggable" class="rounded" /><label for="draggable" class="text-sm">拖拽锚点</label></div>
        </div>
        <div class="grid grid-cols-1 gap-4 pt-2 border-t">
          <div>
            <label class="text-sm font-medium mb-1.5 block">允许排序的列</label>
            <ASelect v-model="uiState.area.config.sortableColumns" multiple allow-clear allow-search placeholder="选择列">
               <AOption v-for="col in availableColumns" :key="col.key" :value="col.key">{{ col.label }}</AOption>
            </ASelect>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">允许筛选的列</label>
            <ASelect v-model="uiState.area.config.filterableColumns" multiple allow-clear allow-search placeholder="选择列">
               <AOption v-for="col in availableColumns" :key="col.key" :value="col.key">{{ col.label }}</AOption>
            </ASelect>
          </div>
        </div>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
/* PageList styles moved to ArcoTable component */
</style>
