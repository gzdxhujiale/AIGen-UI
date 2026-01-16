import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
// Arco Design Vue 样式
import '@arco-design/web-vue/dist/arco.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
