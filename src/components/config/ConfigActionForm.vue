<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input as AInput, Select as ASelect, Option as AOption, Textarea as ATextarea, Button as AButton } from '@arco-design/web-vue' // Button from Arco for interactions inside form
import { Button as ShadcnButton } from '@/components/ui/button' // For preview
import { Plus, Trash2, FormInput } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: {
    key: string
    label: string
    variant: 'primary' | 'outline' | 'text' | 'shadcn-outline'
    className?: string
    effectType?: 'none' | 'modal'
    effectTitle?: string
    effectContent?: string
    effectFormItems?: any[]
  }
}>()

const emit = defineEmits(['update:modelValue'])

const formState = ref({ ...props.modelValue })

// Ensure effectFormItems is an array
if (!formState.value.effectFormItems) {
  formState.value.effectFormItems = []
}

watch(() => props.modelValue, (newVal) => {
  const newState = { 
    ...newVal,
    effectFormItems: newVal.effectFormItems || []
  }
  if (JSON.stringify(newState) !== JSON.stringify(formState.value)) {
    formState.value = newState
  }
}, { deep: true })

watch(formState, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// Helper methods for dynamic form items
const addEffectFormItem = () => {
  if (!formState.value.effectFormItems) formState.value.effectFormItems = []
  
  formState.value.effectFormItems.push({
    key: 'field_' + (formState.value.effectFormItems.length + 1),
    label: '新字段',
    type: 'input',
    placeholder: ''
  })
}

const removeEffectFormItem = (index: number) => {
  if (formState.value.effectFormItems) {
    formState.value.effectFormItems.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Key</label>
        <AInput v-model="formState.key" placeholder="如 search" />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">按钮文本</label>
        <AInput v-model="formState.label" placeholder="如 查询" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">样式</label>
        <ASelect v-model="formState.variant" class="w-full">
          <AOption value="primary">Primary (主要)</AOption>
          <AOption value="outline">Outline (线形)</AOption>
          <AOption value="text">Text (文本)</AOption>
          <AOption value="shadcn-outline">Shadcn Outline (Shadcn 边框)</AOption>
        </ASelect>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">自定义样式类</label>
        <AInput v-model="formState.className" placeholder="可选，如 bg-emerald-50" />
      </div>
    </div>

    <!-- 交互效果配置 -->
    <div class="space-y-4 pt-2 border-t">
      <div class="space-y-2">
        <label class="text-sm font-medium">交互效果</label>
        <ASelect v-model="formState.effectType" class="w-full">
          <AOption value="none">无反应 (默认)</AOption>
          <AOption value="modal">弹窗 (Modal)</AOption>
        </ASelect>
      </div>

      <!-- 弹窗配置项 -->
      <div v-if="formState.effectType === 'modal'" class="space-y-4 p-3 border rounded-md bg-muted/20 animate-in fade-in slide-in-from-top-1">
        <div class="space-y-2">
          <label class="text-xs font-medium">弹窗标题</label>
          <AInput v-model="formState.effectTitle" placeholder="请输入弹窗标题" />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-medium">弹窗内容</label>
          <ATextarea 
            v-model="formState.effectContent"
            :auto-size="{ minRows: 3, maxRows: 6 }"
            placeholder="请输入弹窗展示的详细信息"
          />
        </div>

        <!-- 弹窗表单项配置 -->
        <div class="space-y-3 pt-2 border-t mt-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold flex items-center gap-1">
              <FormInput class="w-3 h-3" />
              弹窗表单项 (可选)
            </label>
            <AButton size="mini" type="outline" @click="addEffectFormItem">
              <template #icon><Plus class="w-3 h-3" /></template>
              添加项
            </AButton>
          </div>

          <div v-if="!formState.effectFormItems || formState.effectFormItems.length === 0" class="text-[10px] text-muted-foreground text-center py-4 border border-dashed rounded bg-muted/10">
            暂无表单项，点击上方按钮添加
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="(item, index) in formState.effectFormItems" 
              :key="index"
              class="p-3 border rounded-lg bg-background/50 relative group"
            >
              <AButton 
                type="text"
                status="danger"
                size="mini" 
                class="!absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="removeEffectFormItem(index)"
              >
                <Trash2 class="w-3 h-3" />
              </AButton>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-[10px] text-muted-foreground">标签 (Label)</label>
                  <AInput v-model="item.label" size="small" class="w-full" placeholder="如 用户名" />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] text-muted-foreground">字段名 (Key)</label>
                  <AInput v-model="item.key" size="small" class="w-full" placeholder="如 username" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 mt-2">
                <div class="space-y-1">
                  <label class="text-[10px] text-muted-foreground">类型 (Type)</label>
                  <ASelect v-model="item.type" class="w-full" size="small">
                    <AOption value="input">文本输入 (Input)</AOption>
                    <AOption value="select">下拉选择 (Select)</AOption>
                    <AOption value="date-range">时间范围 (DateRange)</AOption>
                    <AOption value="tree-select">树形选择 (TreeSelect)</AOption>
                  </ASelect>
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] text-muted-foreground">提示 (Placeholder)</label>
                  <AInput v-model="item.placeholder" size="small" class="w-full" placeholder="请输入..." />
                </div>
              </div>

              <!-- 下拉项配置 (如果是 Select) -->
              <div v-if="item.type === 'select'" class="mt-2 space-y-1">
                  <label class="text-[10px] text-muted-foreground">选项 (逗号隔开)</label>
                  <AInput 
                    :model-value="item.options?.join(',')" 
                    @update:model-value="(v: any) => item.options = String(v).split(',').filter(Boolean)"
                    size="small"
                    class="w-full" 
                    placeholder="选项1,选项2,选项3" 
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Preview Section -->
    <div class="space-y-2 pt-2 border-t">
      <label class="text-sm font-medium text-muted-foreground">预览</label>
      <div class="flex items-center gap-3 p-3 rounded-md bg-muted/30">
        <ShadcnButton
          v-if="formState.variant === 'shadcn-outline'"
          variant="outline"
          class="h-9 px-5"
          :class="formState.className"
        >
          {{ formState.label || '按钮文本' }}
        </ShadcnButton>
        <AButton 
          v-else
          :type="formState.variant as any"
          :class="formState.className"
        >
          {{ formState.label || '按钮文本' }}
        </AButton>
        <span class="text-xs text-muted-foreground">← 按钮实际样式</span>
      </div>
    </div>
  </div>
</template>

<!-- 样式已抽取至全局 src/styles/arco-form-override.css -->
