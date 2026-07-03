import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/index.css'
// Arco Design Vue 样式
import '@arco-design/web-vue/dist/arco.css'
// Arco 表单组件样式覆盖（统一白色背景、主色边框）
import './assets/styles/arco-form-override.css'
import App from './App.vue'

import { clerkPlugin } from '@clerk/vue'
import { zhCN } from '@clerk/localizations'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  localization: zhCN,
  appearance: {
    elements: {
      watermark: 'hidden'
    }
  }
})
app.mount('#app')
