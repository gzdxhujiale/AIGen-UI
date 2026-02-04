<script setup lang="ts">
import { Input as AInput } from '@arco-design/web-vue'

defineProps<{
  label: string
  modelValue: string | number | undefined
  placeholder?: string
  width?: string
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
      allow-clear
      :style="{ width: width || '200px' }"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
