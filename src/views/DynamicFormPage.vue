<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Button as AButton, 
  Input as AInput, 
  Textarea as ATextarea, 
  Message,
  Card as ACard,
  Modal as AModal,
  Select as ASelect,
  Option as AOption,
  Popconfirm as APopconfirm,
} from '@arco-design/web-vue'
import { Save, Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { useNavigation } from '@/composables/useNavigation'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigStore } from '@/stores/configStore'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterRadio, FilterCheckbox, FilterInputTag } from '@/components/ui/filter'

const { currentNavId, detailKey, setDetailTitle } = useNavigation()
const pageStore = useConfigPageStore()
const configStore = useConfigStore()
const isEditMode = computed(() => configStore.isEditMode)

const formData = ref<Record<string, any>>({})
const loading = ref(false)

// Edit form item modal
const editModal = ref({ visible: false, mode: 'add' as 'add' | 'edit', index: -1, form: { key: '', label: '', type: 'input', placeholder: '', options: [] as string[], precision: '', disabled: false } })

// Determine Context
const context = computed(() => {
  if (!currentNavId.value || !detailKey.value) return null
  
  const navTitle = pageStore.findNavTitleBySubId(currentNavId.value)
  if (!navTitle) return null
  
  const config = pageStore.getSubPageConfig(navTitle, currentNavId.value)
  if (!config?.component?.actionsArea?.buttons) return null
  
  const actionBtn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
  if (!actionBtn || actionBtn.effectType !== 'page-form') return null
  
  return {
    navTitle,
    actionBtn,
    effectConfig: actionBtn.effectConfig
  }
})

const formItems = computed(() => context.value?.effectConfig?.formItems || [])

// Initialize Form Data
watch(context, (ctx) => {
  if (ctx && ctx.effectConfig?.formItems) {
    const data: Record<string, any> = {}
    ctx.effectConfig.formItems.forEach((item: any) => {
      if ((item.type === 'select' && item.multiple !== false) || item.type === 'checkbox' || item.type === 'date-range') {
        data[item.key] = item.defaultValue || []
      } else {
        data[item.key] = item.defaultValue || ''
      }
    })
    formData.value = data
  }
}, { immediate: true })

const goBack = () => {
  setDetailTitle(null)
}

const handleSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
  Message.success('提交成功')
  goBack()
}

const openAddItem = () => {
  editModal.value = { visible: true, mode: 'add', index: -1, form: { key: '', label: '', type: 'input', placeholder: '', options: [], precision: '', disabled: false } }
}

const openEditItem = (index: number, item: any) => {
  editModal.value = { 
    visible: true, 
    mode: 'edit', 
    index, 
    form: { 
      key: item.key, 
      label: item.label, 
      type: item.type, 
      placeholder: item.placeholder || '', 
      options: item.options || [],
      precision: item.precision || '',
      disabled: item.disabled || false
    } 
  }
}

const saveFormItem = async () => {
  const { mode, index, form } = editModal.value
  const ctx = context.value
  if (!ctx) return
  
  const config = pageStore.getSubPageConfig(ctx.navTitle, currentNavId.value)
  if (!config?.component?.actionsArea?.buttons) return
  
  const btn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
  if (!btn?.effectConfig) return
  if (!btn.effectConfig.formItems) btn.effectConfig.formItems = []
  
  const newItem: any = {
    key: form.key || `f_${Date.now()}`,
    label: form.label,
    type: form.type,
    placeholder: form.placeholder || undefined,
    options: ['select', 'radio', 'checkbox'].includes(form.type) 
      ? (Array.isArray(form.options) ? form.options : []) 
      : undefined,
    precision: ['date', 'date-range'].includes(form.type) && form.precision ? form.precision : undefined,
    disabled: form.disabled || undefined
  }
  
  if (mode === 'edit' && index >= 0) {
    btn.effectConfig.formItems[index] = newItem
  } else {
    btn.effectConfig.formItems.push(newItem)
  }
  
  await pageStore.updateSubPageComponent(ctx.navTitle, currentNavId.value, config.component)
  editModal.value.visible = false
  Message.success('保存成功')
}

const deleteFormItem = async (index: number) => {
  const ctx = context.value
  if (!ctx) return
  
  const config = pageStore.getSubPageConfig(ctx.navTitle, currentNavId.value)
  if (!config?.component?.actionsArea?.buttons) return
  
  const btn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
  if (!btn?.effectConfig?.formItems) return
  
  btn.effectConfig.formItems.splice(index, 1)
  await pageStore.updateSubPageComponent(ctx.navTitle, currentNavId.value, config.component)
  Message.success('删除成功')
}
</script>

<template>
  <div class="dynamic-form-page h-full flex flex-col">
    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-3xl mx-auto relative -left-[40px]">
        <ACard :bordered="false" class="bg-transparent" :header-style="{ border: 'none' }">
          <div v-if="!context" class="py-10 text-center text-muted-foreground">
             配置不存在或已失效
          </div>
          <div v-else class="space-y-6 py-4">
             <!-- Edit mode header -->
             <div v-if="isEditMode" class="flex items-center justify-between pb-3 border-b">
               <span class="text-sm font-medium text-muted-foreground">表单项 ({{ formItems.length }} 个)</span>
               <AButton size="mini" @click="openAddItem"><Plus class="w-3 h-3 mr-1" />添加表单项</AButton>
             </div>
             
             <div class="space-y-6">
                <template v-for="(item, itemIndex) in formItems" :key="item.key">
                   <div class="relative group">
                      <FilterInput v-if="item.type === 'input'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" width="320px" />
                      <FilterSelect v-else-if="item.type === 'select'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :placeholder="item.placeholder" :multiple="item.multiple !== false" :disabled="item.disabled" width="320px" />
                      <FilterDateRange v-else-if="item.type === 'date-range'" :label="item.label" v-model="formData[item.key]" :precision="item.precision" :disabled="item.disabled" width="320px" />
                      <FilterDateRange v-else-if="item.type === 'date'" :label="item.label" v-model="formData[item.key]" mode="single" :precision="item.precision" :disabled="item.disabled" width="320px" />
                      <FilterTreeSelect v-else-if="item.type === 'tree-select'" :label="item.label" v-model="formData[item.key]" :options="item.treeOptions || []" :placeholder="item.placeholder" :disabled="item.disabled" width="320px" />
                      <FilterRadio v-else-if="item.type === 'radio'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" width="320px" />
                      <FilterCheckbox v-else-if="item.type === 'checkbox'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" width="320px" />
                      <div v-else class="space-y-1.5">
                         <label class="text-xs font-medium text-muted-foreground">{{ item.label }}</label>
                         <ATextarea v-if="item.type === 'textarea'" v-model="formData[item.key]" :placeholder="item.placeholder" :auto-size="{minRows:3}" />
                         <AInput v-else v-model="formData[item.key]" :placeholder="item.placeholder" />
                      </div>
                      
                      <!-- Edit mode actions -->
                      <div v-if="isEditMode" class="absolute right-0 top-0 bg-background/95 backdrop-blur-sm border shadow-sm rounded-md flex items-center p-0.5 z-10 space-x-0.5">
                        <AButton size="mini" type="text" class="!px-1.5 !h-6" @click.stop="openEditItem(itemIndex, item)">
                          <Pencil class="w-3.5 h-3.5" />
                        </AButton>
                        <div class="w-px h-3 bg-border/60 mx-0.5"></div>
                        <APopconfirm content="确定要删除该表单项吗?" @ok="deleteFormItem(itemIndex)">
                          <AButton size="mini" type="text" status="danger" class="!px-1.5 !h-6" @click.stop>
                            <Trash2 class="w-3.5 h-3.5" />
                          </AButton>
                        </APopconfirm>
                      </div>
                   </div>
                </template>
             </div>
             
             <!-- Actions -->
             <div class="pt-4 flex justify-end gap-3 border-t">
                <AButton @click="goBack">取消</AButton>
                <AButton type="primary" :loading="loading" @click="handleSubmit">
                    <template #icon><Save class="w-4 h-4" /></template>
                    保存
                </AButton>
             </div>
          </div>
        </ACard>
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
            <AOption value="textarea">文本域</AOption>
            <AOption value="select">下拉框</AOption>
            <AOption value="date-range">日期范围</AOption>
            <AOption value="date">单点日期</AOption>
            <AOption value="tree-select">树形选择</AOption>
            <AOption value="radio">单选框</AOption>
            <AOption value="checkbox">复选框</AOption>
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
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="editModal.form.disabled" id="disabledCheckbox" class="w-4 h-4 rounded" />
          <label for="disabledCheckbox" class="text-sm font-medium">禁用</label>
        </div>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
:deep(.arco-card-body) {
  padding: 0;
  height: 80vh;
}
</style>

