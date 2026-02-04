<script setup lang="ts">
import { RangePicker as ARangePicker } from '@arco-design/web-vue'

defineProps<{
  label: string
  modelValue: (string | number | Date)[] | undefined
  width?: string
}>()

defineEmits<{
  'update:modelValue': [value: (string | number | Date)[] | undefined]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <ARangePicker
      :model-value="Array.isArray(modelValue) ? modelValue : []"
      allow-clear
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="(val: any) => $emit('update:modelValue', val)"
    />
  </div>
</template>
