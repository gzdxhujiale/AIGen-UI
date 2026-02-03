<script setup lang="ts">
import { TreeSelect as ATreeSelect } from '@arco-design/web-vue'

// 树节点类型
export interface TreeNode {
  value: string
  label: string
  children?: TreeNode[]
}

defineProps<{
  label: string
  modelValue: string | undefined
  options: TreeNode[]
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <ATreeSelect
      :model-value="modelValue"
      :data="options"
      :placeholder="placeholder"
      allow-search
      allow-clear
      :field-names="{ key: 'value', title: 'label', children: 'children' }"
      class="flex-1 w-[200px]"
      @update:model-value="(val: any) => $emit('update:modelValue', val)"
    />
  </div>
</template>

