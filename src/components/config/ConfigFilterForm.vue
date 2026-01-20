<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input as AInput, Select as ASelect, Option as AOption, Textarea as ATextarea } from '@arco-design/web-vue'

const props = defineProps<{
  modelValue: {
    key: string
    type: 'input' | 'select' | 'date-range' | 'tree-select'
    label: string
    placeholder?: string
    options?: string // Comma separated string for editing
    treeOptions?: string // JSON string for editing
  }
}>()

const emit = defineEmits(['update:modelValue'])

const formState = ref({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  formState.value = { ...newVal }
}, { deep: true })

watch(formState, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium mb-1.5 block">字段名 (Key)</label>
        <AInput v-model="formState.key" placeholder="如: keyword" />
      </div>
      <div>
        <label class="text-sm font-medium mb-1.5 block">显示标签 (Label)</label>
        <AInput v-model="formState.label" placeholder="如: 关键词" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium mb-1.5 block">类型 (Type)</label>
        <ASelect v-model="formState.type" class="w-full">
          <AOption value="input">输入框 (Input)</AOption>
          <AOption value="select">下拉框 (Select)</AOption>
          <AOption value="date-range">日期范围 (DateRange)</AOption>
          <AOption value="tree-select">树形选择 (TreeSelect)</AOption>
        </ASelect>
      </div>
      <div>
        <label class="text-sm font-medium mb-1.5 block">占位文字 (Placeholder)</label>
        <AInput v-model="formState.placeholder" placeholder="请输入..." />
      </div>
    </div>

    <!-- 动态配置项 -->
    <div v-if="formState.type === 'select'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
      <label class="text-sm font-medium block">
        选项列表 (Options) <span class="text-xs text-muted-foreground font-normal ml-1">使用逗号分隔</span>
      </label>
      <ATextarea 
        v-model="formState.options" 
        placeholder="例如: 选项A,选项B,选项C" 
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </div>

    <div v-if="formState.type === 'tree-select'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
      <label class="text-sm font-medium block">
        树形数据 (Tree Options JSON)
      </label>
      <ATextarea 
        v-model="formState.treeOptions" 
        placeholder='[{"key": "1", "title": "Node 1", "children": [...]}]' 
        :auto-size="{ minRows: 4, maxRows: 8 }"
        class="font-mono text-xs"
      />
    </div>
  </div>
</template>

<!-- 样式已抽取至全局 src/styles/arco-form-override.css -->
