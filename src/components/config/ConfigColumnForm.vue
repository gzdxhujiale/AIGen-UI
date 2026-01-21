<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input as AInput, Select as ASelect, Option as AOption } from '@arco-design/web-vue'

const props = defineProps<{
  modelValue: {
    key: string
    label: string
    width?: string
    type: 'text' | 'badge' | 'status-badge' | 'text-button' | 'link'
    mockFormat?: 'none' | 'text' | 'datetime' | 'number' | 'list'
    mockList?: string // Comma separated
    buttons?: string // Comma separated for text-button
    fixed?: 'none' | 'left' | 'right'
    align?: 'left' | 'center' | 'right'
    ellipsis?: boolean
    tooltip?: boolean
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
      <div>
        <label class="text-sm font-medium mb-1.5 block">字段名 (Key)</label>
        <AInput v-model="formState.key" placeholder="如: user_name" />
      </div>
      <div>
        <label class="text-sm font-medium mb-1.5 block">显示标签 (Label)</label>
        <AInput v-model="formState.label" placeholder="如: 用户名" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium mb-1.5 block">宽度 (Width)</label>
        <AInput v-model="formState.width" placeholder="如: 120px" />
      </div>
      <div>
        <label class="text-sm font-medium mb-1.5 block">类型 (Type)</label>
        <ASelect v-model="formState.type" class="w-full">
          <AOption value="text">普通文本 (Text)</AOption>
          <AOption value="badge">徽标 (Badge)</AOption>
          <AOption value="status-badge">状态点 (Status Badge)</AOption>
          <AOption value="text-button">文字按钮组 (Text Button)</AOption>
        </ASelect>
      </div>
    </div>

    <!-- 模拟数据配置 -->
    <div class="p-3 border rounded-md bg-muted/20 space-y-3">
      <div class="grid grid-cols-2 gap-4">
         <div>
          <label class="text-sm font-medium mb-1.5 block">Mock 格式</label>
          <ASelect v-model="formState.mockFormat" class="w-full" placeholder="选择生成规则">
            <AOption value="none">无</AOption>
            <AOption value="text">随机文本</AOption>
            <AOption value="datetime">随机时间</AOption>
            <AOption value="number">随机数字</AOption>
            <AOption value="list">从列表随机</AOption>
          </ASelect>
        </div>
        <div v-if="formState.mockFormat === 'list'">
          <label class="text-sm font-medium mb-1.5 block">随机列表 (逗号隔开)</label>
          <AInput v-model="formState.mockList" placeholder="A, B, C" />
        </div>
      </div>
    </div>

    <!-- 按钮组配置 -->
    <div v-if="formState.type === 'text-button'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
       <label class="text-sm font-medium block">
        按钮列表 (包含的 Action Key) <span class="text-xs text-muted-foreground font-normal ml-1">逗号分隔</span>
      </label>
      <AInput v-model="formState.buttons" placeholder="edit, delete, view" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium mb-1.5 block">固定方式 (Fixed)</label>
        <ASelect v-model="formState.fixed" class="w-full">
          <AOption value="none">不固定</AOption>
          <AOption value="left">左侧固定</AOption>
          <AOption value="right">右侧固定</AOption>
        </ASelect>
      </div>
       <div>
        <label class="text-sm font-medium mb-1.5 block">对齐方式 (Align)</label>
        <ASelect v-model="formState.align" class="w-full">
          <AOption value="left">左对齐</AOption>
          <AOption value="center">居中</AOption>
          <AOption value="right">右对齐</AOption>
        </ASelect>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
       <div class="flex items-center gap-2 pt-2">
        <input 
          type="checkbox" 
          v-model="formState.ellipsis"
          id="col-ellipsis"
          class="rounded border-input text-primary focus:ring-primary w-4 h-4"
        />
        <label for="col-ellipsis" class="text-sm">内容过长省略 (Ellipsis)</label>
      </div>
      <div class="flex items-center gap-2 pt-2">
        <input 
          type="checkbox" 
          v-model="formState.tooltip"
          id="col-tooltip"
          class="rounded border-input text-primary focus:ring-primary w-4 h-4"
        />
        <label for="col-tooltip" class="text-sm">显示提示 (Tooltip)</label>
      </div>
    </div>
  </div>
</template>

<!-- 样式已抽取至全局 src/styles/arco-form-override.css -->
