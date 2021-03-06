import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
// @ts-ignore
import store from './store/index.js'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')