<script setup lang="ts">
defineProps<{
  label: string
  value: string
  width?: string
}>()
</script>

<template>
  <div class="flex items-baseline gap-2" :style="width ? { width } : undefined">
    <span class="text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0">{{ label }}：</span>
    <span class="text-sm text-foreground break-all">{{ value || '—' }}</span>
  </div>
</template>
