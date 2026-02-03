<script setup lang="ts">
import { computed } from 'vue'
import { Result as AResult, Button as AButton } from '@arco-design/web-vue'

const props = defineProps<{
  type: '403' | '404' | '500'
}>()

const config = computed(() => {
  switch (props.type) {
    case '403':
        return {
            status: '403',
            title: '403 Forbidden',
            subtitle: '抱歉，您无权访问该页面。'
        }
    case '404':
        return {
            status: '404',
            title: '404 Not Found',
            subtitle: '抱歉，您访问的页面不存在。'
        }
    case '500':
        return {
            status: '500',
            title: '500 Internal Server Error',
            subtitle: '抱歉，服务器出错了。'
        }
    default:
        return {
            status: '404',
            title: '404 Not Found',
            subtitle: '抱歉，您访问的页面不存在。'
        }
  }
})

const goHome = () => {
   // Reset to default - initNavigation will handle finding the first page
   // Or we can just reload the page without params
   const url = new URL(window.location.href)
   url.searchParams.delete('nav')
   window.history.pushState({}, '', url.toString())
   window.location.reload() // Simple way to reset state
}
</script>

<template>
  <div class="container">
    <a-result :status="config.status as any" :title="config.title" :subtitle="config.subtitle">
      <template #extra>
        <a-button key="back" type="primary" @click="goHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-1);
}
</style>
