import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
// Arco Design Vue 样式
import '@arco-design/web-vue/dist/arco.css'
// Arco 表单组件样式覆盖（统一白色背景、主色边框）
import './styles/arco-form-override.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
