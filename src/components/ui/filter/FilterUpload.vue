<script setup lang="ts">
import { Upload as AUpload, Button as AButton, Message } from '@arco-design/web-vue'
import type { FileItem } from '@arco-design/web-vue'
import { ref } from 'vue'
import { UploadCloud } from 'lucide-vue-next'

defineProps<{
  label: string
  width?: string
  disabled?: boolean
  accept?: string
  limit?: number
  /** 展示格式: text=文本按钮, button=按钮, dragger=拖拽区域 */
  displayMode?: 'text' | 'button' | 'dragger'
  draggerHeight?: string
  tip?: string
}>()

const fileList = ref<FileItem[]>([])

const handleChange = (_list: FileItem[], fileItem: FileItem) => {
  if (fileItem.status === 'done') {
    Message.success(`${fileItem.name} 上传成功`)
  }
}
</script>

<template>
  <div 
    :class="displayMode === 'dragger' ? 'flex flex-col gap-1.5' : 'flex items-center gap-2'" 
    :style="width ? { width } : undefined"
  >
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    
    <div class="flex-1 flex flex-col gap-1">
      <!-- 拖拽上传 -->
      <AUpload
        v-if="displayMode === 'dragger'"
        v-model:file-list="fileList"
        :disabled="disabled"
        :accept="accept"
        :limit="limit || 5"
        :draggable="true"
        action="/"
        :auto-upload="false"
        @change="handleChange"
      >
        <template #upload-item="{ fileItem }">
          <div class="flex items-center gap-2 text-xs py-1">
            <span class="truncate-1 flex-1">{{ fileItem.name }}</span>
            <span v-if="fileItem.status === 'done'" class="text-success">已完成</span>
            <span v-else-if="fileItem.status === 'uploading'" class="text-primary">上传中</span>
          </div>
        </template>
        <template #drag-icon>
           <div 
             class="w-full flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
             :style="{ height: draggerHeight || '120px' }"
           >
             <UploadCloud class="w-8 h-8 text-muted-foreground/60 mb-2" />
             <div class="text-xs text-muted-foreground">将文件拖到此处，或<span class="text-primary font-medium">点击上传</span></div>
           </div>
        </template>
      </AUpload>
      
      <!-- 文本按钮上传 -->
      <AUpload
        v-else-if="displayMode === 'text'"
        v-model:file-list="fileList"
        :disabled="disabled"
        :accept="accept"
        :limit="limit || 5"
        action="/"
        :auto-upload="false"
        @change="handleChange"
      >
        <template #upload-button>
          <a class="text-sm text-primary hover:text-primary/80 cursor-pointer underline underline-offset-2">点击上传</a>
        </template>
      </AUpload>
      
      <!-- 按钮上传 (默认) -->
      <AUpload
        v-else
        v-model:file-list="fileList"
        :disabled="disabled"
        :accept="accept"
        :limit="limit || 5"
        action="/"
        :auto-upload="false"
        @change="handleChange"
      >
        <template #upload-button>
          <AButton size="small" type="primary" :disabled="disabled">
            <template #icon><UploadCloud class="w-3.5 h-3.5" /></template>
            点击上传
          </AButton>
        </template>
      </AUpload>
      
      <span v-if="tip" class="text-xs text-muted-foreground/70">{{ tip }}</span>
    </div>
  </div>
</template>
