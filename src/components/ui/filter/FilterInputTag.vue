<script setup lang="ts">
import { InputTag as AInputTag } from '@arco-design/web-vue'

const props = withDefaults(defineProps<{
  label?: string
  modelValue: string[] | undefined
  placeholder?: string
  width?: string
  maxTagCount?: number
}>(), {
  maxTagCount: 0,
  placeholder: '输入后回车添加'
})

defineEmits<{
  'update:modelValue': [value: string[]]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <label v-if="label" class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <AInputTag
      :model-value="modelValue || []"
      :placeholder="placeholder"
      :max-tag-count="maxTagCount === 0 ? undefined : maxTagCount"
      allow-clear
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="$emit('update:modelValue', $event as string[])"
    />
  </div>
</template>
