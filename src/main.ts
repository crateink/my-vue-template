import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import directive from './directive'

import '@/assets/styles/global.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(directive)

app.mount('#app')
