<script setup lang="ts">
import { Input as AInput } from '@arco-design/web-vue'

defineProps<{
  label: string
  modelValue: string | number | undefined
  placeholder?: string
  width?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <AInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      allow-clear
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
