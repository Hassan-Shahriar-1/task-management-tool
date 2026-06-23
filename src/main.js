import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import BaseConfirmModal from './components/common/BaseConfirmModal.vue'
import SingleSelect from './components/common/SingleSelect.vue'
import MultiSelect from './components/common/MultiSelect.vue'
import TaskSearchBar from './components/common/TaskSearchBar.vue'
import TaskFilter from './components/common/TaskFilter.vue'

const pinia = createPinia()

const app = createApp(App)

app.component('BaseConfirmModal', BaseConfirmModal)
app.component('SingleSelect', SingleSelect)
app.component('MultiSelect', MultiSelect)
app.component('TaskSearchBar', TaskSearchBar)
app.component('TaskFilter', TaskFilter)

app.use(router)
app.use(pinia)
app.mount('#app')
