<script setup lang="ts">
import { RadioGroup as ARadioGroup, Radio as ARadio } from '@arco-design/web-vue'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string | undefined
  options: string[]
  width?: string
}>(), {
  options: () => []
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <ARadioGroup
      :model-value="modelValue"
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="$emit('update:modelValue', $event as string)"
    >
      <ARadio v-for="opt in options" :key="opt" :value="opt">{{ opt }}</ARadio>
    </ARadioGroup>
  </div>
</template>
