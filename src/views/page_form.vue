<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Button as AButton, 
  Input as AInput, 
  Message,
  Modal as AModal,
  Select as ASelect,
  Option as AOption,
  Popconfirm as APopconfirm,
} from '@arco-design/web-vue'
import { Save, Pencil, Plus, Trash2, Columns2, Columns3, GripVertical } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import { useNavigation } from '@/composables/useNavigation'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigStore } from '@/stores/configStore'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterRadio, FilterCheckbox, FilterInputTag, FilterTextarea, FilterInfo, FilterUpload } from '@/components/ui/filter'
import type { FormPageConfig, FormSection } from '@/types/page-config'

const props = defineProps<{ navId?: string }>()

const { currentNavId, detailKey, detailTitle, detailTargetNavId, setDetailTitle } = useNavigation()
const pageStore = useConfigPageStore()
const configStore = useConfigStore()
const isEditMode = computed(() => configStore.isEditMode)

const formData = ref<Record<string, any>>({})
const loading = ref(false)

// Edit form item modal
const editModal = ref({ visible: false, mode: 'add' as 'add' | 'edit', sectionIndex: 0, index: -1, form: { key: '', label: '', type: 'input', placeholder: '', options: [] as string[], precision: '', disabled: false, defaultValue: '', uploadMode: 'button' as 'text' | 'button' | 'dragger', draggerHeight: '120px' } })

// Edit section title modal
const sectionTitleModal = ref({ visible: false, sectionIndex: 0, title: '' })

// ============================================
// 配置来源：支持三种场景
// ============================================
type ContextSource = 'direct' | 'detail-target' | 'action-button'

interface FormContext {
  navTitle: string
  subId: string
  formConfig: FormPageConfig
  source: ContextSource
}

const context = computed<FormContext | null>(() => {
  const effectiveNavId = props.navId || currentNavId.value
  const navTitle = pageStore.findNavTitleBySubId(effectiveNavId)
  if (!navTitle) return null
  
  const config = pageStore.getSubPageConfig(navTitle, effectiveNavId)
  
  // 场景1：二级导航直接渲染 form 页面（无 detailTitle）
  if (config?.pageType === 'form' && config?.formConfig && (!detailTitle.value || props.navId)) {
    return { navTitle, subId: effectiveNavId, formConfig: config.formConfig, source: 'direct' }
  }
  
  // 场景2：三级面包屑，从 detailTargetNavId 读取目标页
  if (detailTargetNavId.value) {
    const targetNavTitle = pageStore.findNavTitleBySubId(detailTargetNavId.value)
    if (targetNavTitle) {
      const targetConfig = pageStore.getSubPageConfig(targetNavTitle, detailTargetNavId.value)
      if (targetConfig?.formConfig) {
        return { navTitle: targetNavTitle, subId: detailTargetNavId.value, formConfig: targetConfig.formConfig, source: 'detail-target' }
      }
    }
  }
  
  // 场景3：旧模式兼容 —— 从按钮 effectConfig 读取
  if (detailKey.value && config?.component?.actionsArea?.buttons) {
    const actionBtn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
    if (actionBtn?.effectConfig?.formItems) {
      return {
        navTitle,
        subId: effectiveNavId,
        formConfig: { formItems: actionBtn.effectConfig.formItems } as FormPageConfig,
        source: 'action-button'
      }
    }
  }
  
  return null
})

// ============================================
// 多栏支持
// ============================================
const columnCount = computed(() => Math.min(3, Math.max(1, context.value?.formConfig?.columnCount || 1)))

/** 统一返回 sections 数组 */
const sections = computed<FormSection[]>(() => {
  const cfg = context.value?.formConfig
  if (!cfg) return []
  if (cfg.sections?.length) return cfg.sections
  return [{ formItems: cfg.formItems || [] }]
})

const isDirectNav = computed(() => context.value?.source === 'direct')

// Initialize Form Data
watch(context, (ctx) => {
  if (!ctx) return
  const data: Record<string, any> = {}
  const allSections = ctx.formConfig.sections?.length ? ctx.formConfig.sections : [{ formItems: ctx.formConfig.formItems || [] }]
  allSections.forEach(section => {
    section.formItems.forEach((item: any) => {
      if ((item.type === 'select' && item.multiple !== false) || item.type === 'checkbox' || item.type === 'date-range') {
        data[item.key] = item.defaultValue || []
      } else {
        data[item.key] = item.defaultValue || ''
      }
    })
  })
  formData.value = data
}, { immediate: true })

const goBack = () => setDetailTitle(null)

const handleSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
  Message.success('提交成功')
  if (!isDirectNav.value) goBack()
}

// ============================================
// 栏数管理 (Edit Mode)
// ============================================
const setColumnCount = async (count: number) => {
  const ctx = context.value
  if (!ctx || ctx.source === 'action-button') return
  
  const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
  if (!config?.formConfig) return
  
  config.formConfig.columnCount = count
  if (!config.formConfig.sections) {
    config.formConfig.sections = [{ formItems: config.formConfig.formItems || [] }]
  }
  while (config.formConfig.sections.length < count) {
    config.formConfig.sections.push({ formItems: [] })
  }
  
  await pageStore.updateSubPageFormConfig(ctx.navTitle, ctx.subId, config.formConfig)
  Message.success(`已切换为 ${count} 栏`)
}

// ============================================
// 栏标题管理
// ============================================
const openSectionTitle = (sIdx: number) => {
  const section = sections.value[sIdx]
  sectionTitleModal.value = { visible: true, sectionIndex: sIdx, title: section?.title || '' }
}

const saveSectionTitle = async () => {
  const ctx = context.value
  if (!ctx || ctx.source === 'action-button') return
  const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
  if (!config?.formConfig) return
  
  if (!config.formConfig.sections) {
    config.formConfig.sections = [{ formItems: config.formConfig.formItems || [] }]
  }
  const sIdx = sectionTitleModal.value.sectionIndex
  if (config.formConfig.sections[sIdx]) {
    config.formConfig.sections[sIdx].title = sectionTitleModal.value.title || undefined
  }
  
  await pageStore.updateSubPageFormConfig(ctx.navTitle, ctx.subId, config.formConfig)
  sectionTitleModal.value.visible = false
  Message.success('标题已保存')
}

// ============================================
// 表单项 CRUD (per section)
// ============================================
const openAddItem = (sectionIndex: number) => {
  editModal.value = { visible: true, mode: 'add', sectionIndex, index: -1, form: { key: '', label: '', type: 'input', placeholder: '', options: [], precision: '', disabled: false, defaultValue: '', uploadMode: 'button', draggerHeight: '120px' } }
}

const openEditItem = (sectionIndex: number, index: number, item: any) => {
  editModal.value = { 
    visible: true, mode: 'edit', sectionIndex, index, 
    form: { 
      key: item.key, label: item.label, type: item.type, 
      placeholder: item.placeholder || '', options: item.options || [],
      precision: item.precision || '', disabled: item.disabled || false,
      defaultValue: item.defaultValue || '', uploadMode: item.uploadMode || 'button',
      draggerHeight: item.draggerHeight || '120px'
    } 
  }
}

const saveFormItem = async () => {
  const { mode, sectionIndex, index, form } = editModal.value
  const ctx = context.value
  if (!ctx) return
  
  const newItem: any = {
    key: form.key || `f_${Date.now()}`,
    label: form.label,
    type: form.type,
    placeholder: form.placeholder || undefined,
    options: ['select', 'radio', 'checkbox'].includes(form.type) 
      ? (Array.isArray(form.options) ? form.options : []) : undefined,
    defaultValue: form.type === 'info' ? (form.defaultValue || undefined) : undefined,
    uploadMode: form.type === 'upload' ? form.uploadMode : undefined,
    draggerHeight: form.type === 'upload' && form.uploadMode === 'dragger' ? form.draggerHeight : undefined
  }
  
  if (ctx.source === 'action-button') {
    const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
    if (!config?.component?.actionsArea?.buttons) return
    const btn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
    if (!btn?.effectConfig) return
    if (!btn.effectConfig.formItems) btn.effectConfig.formItems = []
    if (mode === 'edit' && index >= 0) btn.effectConfig.formItems[index] = newItem
    else btn.effectConfig.formItems.push(newItem)
    await pageStore.updateSubPageComponent(ctx.navTitle, ctx.subId, config.component)
  } else {
    const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
    if (!config?.formConfig) return
    if (!config.formConfig.sections) {
      config.formConfig.sections = [{ formItems: config.formConfig.formItems || [] }]
    }
    if (!config.formConfig.sections[sectionIndex]) {
      config.formConfig.sections[sectionIndex] = { formItems: [] }
    }
    const sectionItems = config.formConfig.sections[sectionIndex].formItems
    if (mode === 'edit' && index >= 0) sectionItems[index] = newItem
    else sectionItems.push(newItem)
    await pageStore.updateSubPageFormConfig(ctx.navTitle, ctx.subId, config.formConfig)
  }
  
  editModal.value.visible = false
  Message.success('保存成功')
}

const deleteFormItem = async (sectionIndex: number, index: number) => {
  const ctx = context.value
  if (!ctx) return
  
  if (ctx.source === 'action-button') {
    const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
    if (!config?.component?.actionsArea?.buttons) return
    const btn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
    if (!btn?.effectConfig?.formItems) return
    btn.effectConfig.formItems.splice(index, 1)
    await pageStore.updateSubPageComponent(ctx.navTitle, ctx.subId, config.component)
  } else {
    const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
    if (!config?.formConfig) return
    if (!config.formConfig.sections) {
      config.formConfig.sections = [{ formItems: config.formConfig.formItems || [] }]
    }
    config.formConfig.sections[sectionIndex]?.formItems.splice(index, 1)
    await pageStore.updateSubPageFormConfig(ctx.navTitle, ctx.subId, config.formConfig)
  }
  Message.success('删除成功')
}

// ============================================
// 拖拽排序
// ============================================
const onDragEnd = async (sIdx: number) => {
  const ctx = context.value
  if (!ctx || ctx.source === 'action-button') return
  console.log(`Section ${sIdx} items reordered`)
  const config = pageStore.getSubPageConfig(ctx.navTitle, ctx.subId)
  if (!config?.formConfig) return
  if (!config.formConfig.sections) {
    config.formConfig.sections = [{ formItems: config.formConfig.formItems || [] }]
  }
  // sections[sIdx].formItems is already mutated by vuedraggable
  await pageStore.updateSubPageFormConfig(ctx.navTitle, ctx.subId, config.formConfig)
}
</script>

<template>
  <div class="dynamic-form-page h-full flex flex-col">
    <div class="flex-1 overflow-y-auto p-6">
      <div :class="columnCount === 1 ? 'max-w-3xl mx-auto relative -left-[40px]' : 'max-w-6xl mx-auto'">
        
        <!-- Edit mode: column count switcher -->
        <div v-if="isEditMode && context && context.source !== 'action-button'" class="flex items-center justify-end gap-2 mb-4">
          <span class="text-xs text-muted-foreground mr-1">栏数:</span>
          <AButton :type="columnCount === 1 ? 'primary' : 'secondary'" size="mini" @click="setColumnCount(1)">1栏</AButton>
          <AButton :type="columnCount === 2 ? 'primary' : 'secondary'" size="mini" @click="setColumnCount(2)">
            <template #icon><Columns2 class="w-3 h-3" /></template>2栏
          </AButton>
          <AButton :type="columnCount === 3 ? 'primary' : 'secondary'" size="mini" @click="setColumnCount(3)">
            <template #icon><Columns3 class="w-3 h-3" /></template>3栏
          </AButton>
        </div>
        
        <div v-if="!context" class="py-10 text-center text-muted-foreground">
           配置不存在或已失效
        </div>
        
        <!-- Multi-section layout -->
        <div v-else class="flex flex-col gap-6">
          <div class="grid gap-5 items-stretch" :style="{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }">
            <template v-for="(section, sIdx) in sections.slice(0, columnCount)" :key="sIdx">
              <div 
                class="flex flex-col min-h-[calc(100vh-210px)]"
                :class="columnCount > 1 ? 'border rounded-lg bg-background' : ''"
              >
                <!-- Section title -->
                <div v-if="section.title || isEditMode" class="flex items-center justify-between px-5 pt-4 pb-2" :class="section.title ? 'border-b mb-3' : ''">
                  <h3 v-if="section.title" class="text-sm font-semibold text-foreground">{{ section.title }}</h3>
                  <span v-else class="text-xs text-muted-foreground/50 italic">未设置标题</span>
                  <AButton v-if="isEditMode && context?.source !== 'action-button'" size="mini" type="text" @click="openSectionTitle(sIdx)">
                    <Pencil class="w-3 h-3 mr-1" />标题
                  </AButton>
                </div>
                
                <!-- Section body -->
                <div class="flex-1 px-5 pb-4 space-y-6" :class="!section.title && !isEditMode ? 'pt-4' : ''">
                  <!-- Edit mode header -->
                  <div v-if="isEditMode" class="flex items-center justify-between pb-2 border-b border-dashed">
                    <span class="text-xs text-muted-foreground">
                      {{ columnCount > 1 ? `第 ${sIdx + 1} 栏 · ` : '' }}{{ section.formItems.length }} 个表单项
                    </span>
                    <AButton size="mini" @click="openAddItem(sIdx)"><Plus class="w-3 h-3 mr-1" />添加</AButton>
                  </div>
                  
                  <!-- Form items (draggable in edit mode) -->
                  <draggable
                    v-if="isEditMode"
                    :list="section.formItems"
                    item-key="key"
                    handle=".drag-handle"
                    ghost-class="opacity-30"
                    @end="onDragEnd(sIdx)"
                    class="space-y-6"
                  >
                    <template #item="{ element: item, index: itemIndex }">
                      <div class="relative group flex items-start gap-1">
                        <div class="drag-handle cursor-grab active:cursor-grabbing pt-1 opacity-40 hover:opacity-80 transition-opacity shrink-0">
                          <GripVertical class="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div class="flex-1">
                          <FilterInput v-if="item.type === 'input'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterTextarea v-else-if="item.type === 'textarea'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterSelect v-else-if="item.type === 'select'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :placeholder="item.placeholder" :multiple="item.multiple !== false" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterDateRange v-else-if="item.type === 'date-range'" :label="item.label" v-model="formData[item.key]" :precision="item.precision" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterDateRange v-else-if="item.type === 'date'" :label="item.label" v-model="formData[item.key]" mode="single" :precision="item.precision" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterTreeSelect v-else-if="item.type === 'tree-select'" :label="item.label" v-model="formData[item.key]" :options="item.treeOptions || []" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterRadio v-else-if="item.type === 'radio'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterCheckbox v-else-if="item.type === 'checkbox'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterInfo v-else-if="item.type === 'info'" :label="item.label" :value="String(item.defaultValue || '')" :width="columnCount === 1 ? '320px' : '100%'" />
                          <FilterUpload v-else-if="item.type === 'upload'" :label="item.label" :disabled="item.disabled" :display-mode="item.uploadMode || 'button'" :dragger-height="item.draggerHeight" :width="columnCount === 1 ? '320px' : '100%'" />
                          <div v-else class="space-y-1.5">
                             <label class="text-xs font-medium text-muted-foreground">{{ item.label }}</label>
                             <AInput v-model="formData[item.key]" :placeholder="item.placeholder" />
                          </div>
                        </div>
                        
                        <!-- Edit mode actions -->
                        <div class="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                          <AButton size="mini" type="text" class="!px-1.5 !h-6" @click.stop="openEditItem(sIdx, itemIndex, item)">
                            <Pencil class="w-3.5 h-3.5" />
                          </AButton>
                          <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                          <APopconfirm content="确定要删除该表单项吗?" @ok="deleteFormItem(sIdx, itemIndex)">
                            <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6" @click.stop>
                              <Trash2 class="w-3.5 h-3.5" />
                            </AButton>
                          </APopconfirm>
                        </div>
                      </div>
                    </template>
                  </draggable>

                  <!-- Form items (non-edit, no drag) -->
                  <div v-else class="space-y-6">
                    <template v-for="item in section.formItems" :key="item.key">
                      <div class="relative group">
                        <FilterInput v-if="item.type === 'input'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterTextarea v-else-if="item.type === 'textarea'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterSelect v-else-if="item.type === 'select'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :placeholder="item.placeholder" :multiple="item.multiple !== false" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterDateRange v-else-if="item.type === 'date-range'" :label="item.label" v-model="formData[item.key]" :precision="item.precision" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterDateRange v-else-if="item.type === 'date'" :label="item.label" v-model="formData[item.key]" mode="single" :precision="item.precision" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterTreeSelect v-else-if="item.type === 'tree-select'" :label="item.label" v-model="formData[item.key]" :options="item.treeOptions || []" :placeholder="item.placeholder" :disabled="item.disabled" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterRadio v-else-if="item.type === 'radio'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterCheckbox v-else-if="item.type === 'checkbox'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterInfo v-else-if="item.type === 'info'" :label="item.label" :value="String(item.defaultValue || '')" :width="columnCount === 1 ? '320px' : '100%'" />
                        <FilterUpload v-else-if="item.type === 'upload'" :label="item.label" :disabled="item.disabled" :display-mode="item.uploadMode || 'button'" :dragger-height="item.draggerHeight" :width="columnCount === 1 ? '320px' : '100%'" />
                        <div v-else class="space-y-1.5">
                           <label class="text-xs font-medium text-muted-foreground">{{ item.label }}</label>
                           <AInput v-model="formData[item.key]" :placeholder="item.placeholder" />
                        </div>
                      </div>
                    </template>
                  </div>
                  
                  <!-- Empty section placeholder -->
                  <div v-if="section.formItems.length === 0 && !isEditMode" class="flex-1 flex items-center justify-center py-8 text-muted-foreground/40 text-sm">
                    暂无表单项
                  </div>
                </div>
              </div>
            </template>
          </div>
              
          <!-- Actions -->
          <div class="pt-4 flex justify-end gap-3 border-t">
            <AButton v-if="!isDirectNav" @click="goBack">取消</AButton>
            <AButton type="primary" :loading="loading" @click="handleSubmit">
                <template #icon><Save class="w-4 h-4" /></template>
                保存
            </AButton>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Form Item Modal -->
    <AModal v-model:visible="editModal.visible" :title="(editModal.mode === 'add' ? '添加' : '编辑') + '表单项'" @ok="saveFormItem" :width="400">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">标签 (Label)</label>
          <AInput v-model="editModal.form.label" placeholder="如: 姓名" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">字段名 (Key)</label>
          <AInput v-model="editModal.form.key" placeholder="如: name" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">类型</label>
          <ASelect v-model="editModal.form.type" class="w-full">
            <AOption value="input">输入框</AOption>
            <AOption value="textarea">多行文本</AOption>
            <AOption value="select">下拉框</AOption>
            <AOption value="date-range">日期范围</AOption>
            <AOption value="date">单点日期</AOption>
            <AOption value="tree-select">树形选择</AOption>
            <AOption value="radio">单选框</AOption>
            <AOption value="checkbox">复选框</AOption>
            <AOption value="info">信息展示</AOption>
            <AOption value="upload">文件上传</AOption>
          </ASelect>
        </div>
        <div v-if="['input', 'textarea'].includes(editModal.form.type)">
          <label class="text-sm font-medium mb-1.5 block">占位文字</label>
          <AInput v-model="editModal.form.placeholder" placeholder="请输入..." />
        </div>
        <div v-if="['select', 'radio', 'checkbox'].includes(editModal.form.type)">
          <label class="text-sm font-medium mb-1.5 block">选项列表</label>
          <FilterInputTag v-model="editModal.form.options" placeholder="输入后回车添加" />
        </div>
        <div v-if="['date', 'date-range'].includes(editModal.form.type)">
          <label class="text-sm font-medium mb-1.5 block">时间精度</label>
          <ASelect v-model="editModal.form.precision" class="w-full" placeholder="默认:日">
            <AOption value="year">年</AOption>
            <AOption value="month">月</AOption>
            <AOption value="date">日</AOption>
            <AOption value="hour">时</AOption>
            <AOption value="minute">分</AOption>
            <AOption value="second">秒</AOption>
          </ASelect>
        </div>
        <div v-if="editModal.form.type === 'info'">
          <label class="text-sm font-medium mb-1.5 block">显示内容</label>
          <AInput v-model="editModal.form.defaultValue" placeholder="如: 这是一条信息" />
        </div>
        <div v-if="editModal.form.type === 'upload'">
          <label class="text-sm font-medium mb-1.5 block">展示格式</label>
          <ASelect v-model="editModal.form.uploadMode" class="w-full">
            <AOption value="text">文本按钮</AOption>
            <AOption value="button">按钮上传</AOption>
            <AOption value="dragger">拖拽上传</AOption>
          </ASelect>
        </div>
        <div v-if="editModal.form.type === 'upload' && editModal.form.uploadMode === 'dragger'">
          <label class="text-sm font-medium mb-1.5 block">拖拽高度</label>
          <AInput v-model="editModal.form.draggerHeight" placeholder="如: 120px" />
        </div>
        <div v-if="editModal.form.type !== 'info'" class="flex items-center gap-2">
          <input type="checkbox" v-model="editModal.form.disabled" id="disabledCheckbox" class="w-4 h-4 rounded" />
          <label for="disabledCheckbox" class="text-sm font-medium">禁用</label>
        </div>
      </div>
    </AModal>
    
    <!-- Section Title Modal -->
    <AModal v-model:visible="sectionTitleModal.visible" title="编辑栏标题" @ok="saveSectionTitle" :width="360">
      <div>
        <label class="text-sm font-medium mb-1.5 block">标题 (留空则不显示)</label>
        <AInput v-model="sectionTitleModal.title" placeholder="如: 基本信息" allow-clear />
      </div>
    </AModal>
  </div>
</template>

<style scoped>
/* no additional styles needed */
</style>
