<script setup lang="ts">
import { computed } from 'vue'
import { Select as ASelect, Option as AOption, Checkbox as ACheckbox } from '@arco-design/web-vue'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string[] | undefined
  options: string[]
  maxTagCount?: number
  placeholder?: string
}>(), {
  modelValue: () => [],
  maxTagCount: 1,
  placeholder: '请选择'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const filteredOptions = computed(() => {
  return props.options.filter(opt => opt !== '全部' && opt !== 'All')
})

const internalValue = computed({
  get: () => {
    // 如果值为 "全部" 或 "All"，则视为选择了所有 filteredOptions
    if (props.modelValue === '全部' as any || props.modelValue === 'All' as any) {
      return [...filteredOptions.value]
    }
    return props.modelValue || []
  },
  set: (val: string[]) => {
    emit('update:modelValue', val)
  }
})

const isAllSelected = computed(() => {
  return internalValue.value && filteredOptions.value.length > 0 && internalValue.value.length === filteredOptions.value.length
})

const isIndeterminate = computed(() => {
  const len = internalValue.value?.length || 0
  return len > 0 && len < filteredOptions.value.length
})

const handleSelectAll = (checked: boolean | (string | number | boolean)[]) => {
  if (checked) {
    internalValue.value = [...filteredOptions.value]
  } else {
    internalValue.value = []
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <ASelect
      v-model="internalValue"
      :placeholder="placeholder"
      multiple
      allow-clear
      allow-search
      :max-tag-count="maxTagCount"
      :trigger-props="{ autoFitPopupMinWidth: true }"
      class="w-[200px] text-render-select"
      :class="{ 'is-all-selected': isAllSelected }"
    >
      <template #header>
        <div class="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <ACheckbox
            :model-value="isAllSelected"
            :indeterminate="isIndeterminate"
            @change="handleSelectAll"
          >
            全选
          </ACheckbox>
        </div>
      </template>
      
      <template #prefix v-if="isAllSelected">
        <span class="text-[var(--color-text-1)] whitespace-nowrap pl-1">全选</span>
      </template>

      <AOption v-for="opt in filteredOptions" :key="opt" :value="opt">{{ opt }}</AOption>
    </ASelect>
  </div>
</template>

<style scoped>
/* 移除背景和边框，使标签看起来像文本 */
:deep(.text-render-select .arco-select-view-tag) {
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  color: var(--color-text-1) !important;
  font-size: inherit;
}

/* 在相邻标签之间添加分隔符 */
:deep(.text-render-select .arco-select-view-tag + .arco-select-view-tag::before) {
  content: "、";
  color: var(--color-text-1);
}

/* 隐藏删除图标 */
:deep(.text-render-select .arco-tag-close-btn) {
  display: none !important;
}

/* 当全选时，完全隐藏原本的标签列表，只显示 prefix */
:deep(.is-all-selected .arco-select-view-tag) {
  display: none !important;
}

/* 调整多选时的容器，防止出现不必要的边距 */
:deep(.text-render-select .arco-select-view-selector) {
  gap: 0;
}

/* 限制最大显示宽度并保持单行文字感 */
:deep(.text-render-select .arco-select-view-value) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
