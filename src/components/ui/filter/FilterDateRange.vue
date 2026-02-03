<script setup lang="ts">
import { RangePicker as ARangePicker } from '@arco-design/web-vue'

defineProps<{
  label: string
  modelValue: (string | number | Date)[] | undefined
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
      class="flex-1 w-[200px]"
      @update:model-value="(val: any) => $emit('update:modelValue', val)"
    />
  </div>
</template>
