import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import BaseConfirmModal from './components/common/BaseConfirmModal.vue'

const pinia = createPinia()

const app = createApp(App)

app.component('BaseConfirmModal', BaseConfirmModal)

app.use(router)
app.use(pinia)
app.mount('#app')
