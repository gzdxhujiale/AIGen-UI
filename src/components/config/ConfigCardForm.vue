<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input as AInput } from '@arco-design/web-vue'

const props = defineProps<{
  modelValue: {
    key: string
    title: string
    data: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const formState = ref({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(formState.value)) {
    formState.value = { ...newVal }
  }
}, { deep: true })

watch(formState, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Key</label>
        <AInput v-model="formState.key" placeholder="如 total_users" />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">标题</label>
        <AInput v-model="formState.title" placeholder="如 总用户数" />
      </div>
    </div>
    <div class="space-y-2">
      <label class="text-sm font-medium">数据</label>
      <AInput v-model="formState.data" placeholder="如 1,234 或动态值" />
    </div>
  </div>
</template>

<!-- 样式已抽取至全局 src/styles/arco-form-override.css -->
