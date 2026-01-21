<script setup lang="ts">
/**
 * AIGen Logo 组件
 * 从 schema.ts 提取的 Logo 渲染组件
 */
defineProps<{
  size?: string | number
}>()

// 获取 BASE_URL
const baseUrl = import.meta.env.BASE_URL || '/'
</script>

<template>
  <img 
    :src="`${baseUrl}ai.svg`"
    alt="AIGen Logo"
    :style="{ 
      width: typeof size === 'number' ? `${size}px` : (size || '100%'), 
      height: typeof size === 'number' ? `${size}px` : (size || '100%'), 
      objectFit: 'contain' 
    }"
  />
</template>
