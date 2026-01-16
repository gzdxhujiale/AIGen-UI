<script setup lang="ts">
import { Input } from '@/components/ui/input'

defineProps<{
  label: string
  modelValue: string | number
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <Input
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      class="h-9 text-sm flex-1 filter-input-custom"
    />
  </div>
</template>

<style scoped>
/* 移除焦点时的灰色边框，使用更清爽的样式 */
:deep(.filter-input-custom) {
  transition: border-color 0.2s ease;
}

:deep(.filter-input-custom:focus-visible) {
  outline: none;
  box-shadow: none;
  border-color: hsl(var(--primary));
}

:deep(.filter-input-custom:focus) {
  outline: none;
  box-shadow: none;
  border-color: hsl(var(--primary));
}
</style>
