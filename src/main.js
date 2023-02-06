import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useRem } from './utils/flexible'
import './styles/index.scss'

useRem()
createApp(App).use(router).mount('#app')
