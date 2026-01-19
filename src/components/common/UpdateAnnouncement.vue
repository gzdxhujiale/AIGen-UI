<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

function handleOpenChange(val: boolean) {
  emit('update:open', val)
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle class="text-xl font-bold">📢 更新公告</DialogTitle>
        <DialogDescription>
          最新版本功能更新说明
        </DialogDescription>
      </DialogHeader>

      <div class="py-4 space-y-4">
        <div class="space-y-3">
          <h4 class="font-medium text-primary">本期更新：</h4>
          <ul class="space-y-2 text-sm text-foreground/80 list-disc pl-4">
            <li>
              <span class="font-medium">用户中心新增 Shadcn 风格切换</span>
              <p class="text-xs text-muted-foreground mt-0.5">默认为 Arco Design 字节跳动设计风格，现可自由切换</p>
            </li>
            <li>
              <span class="font-medium">功能区按钮新增【弹窗】效果</span>
              <p class="text-xs text-muted-foreground mt-0.5">支持配置弹窗文案、弹窗表单等交互</p>
            </li>
            <li>
              <span class="font-medium">表格区虚拟数据新增列表格式</span>
              <p class="text-xs text-muted-foreground mt-0.5">支持自定义 mock 数据列表，随机展示</p>
            </li>
            <li>
              <span class="font-medium">新增菜单项配置</span>
              <p class="text-xs text-muted-foreground mt-0.5">支持增删查改配置，包括文字按钮、下拉框等类型</p>
            </li>
          </ul>
        </div>

        <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
          <div class="flex gap-2">
            <span class="text-amber-600 dark:text-amber-500">⚠️</span>
            <div class="space-y-1">
              <p class="text-sm font-medium text-amber-800 dark:text-amber-400">注意事项</p>
              <p class="text-xs text-amber-700 dark:text-amber-500/90 leading-relaxed">
                由于 JSON 配置项大幅增加，AI 功能需要重新调试和优化，暂时无法正常使用，预计 2 天左右恢复正常。
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-xs text-right text-muted-foreground pt-2">
          更新时间：2026-1-19 19:00 hjl
        </div>
      </div>

      <DialogFooter>
        <Button @click="handleOpenChange(false)" class="w-full sm:w-auto">
          我知道了
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
