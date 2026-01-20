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
  formState.value = { ...newVal }
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

<style scoped>
/* Arco 输入/文本域/选择框 样式覆盖 - 白色背景 */
:deep(.arco-input-wrapper),
:deep(.arco-textarea-wrapper),
:deep(.arco-select-view-single) {
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-neutral-3);
  border-radius: 4px;
}

:deep(.arco-input-wrapper:hover),
:deep(.arco-textarea-wrapper:hover),
:deep(.arco-select-view-single:hover) {
  background-color: var(--color-bg-2);
  border-color: rgb(var(--primary-6));
}

:deep(.arco-input-wrapper-focus),
:deep(.arco-textarea-wrapper-focus),
:deep(.arco-select-view-focus) {
  background-color: var(--color-bg-2);
  border-color: rgb(var(--primary-6));
}
</style>
