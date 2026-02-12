<script setup lang="ts">
import { Textarea as ATextarea } from '@arco-design/web-vue'

defineProps<{
  label: string
  modelValue: string | undefined
  placeholder?: string
  width?: string
  disabled?: boolean
  minRows?: number
  maxRows?: number
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <ATextarea
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :auto-size="{ minRows: minRows ?? 3, maxRows: maxRows ?? 8 }"
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
