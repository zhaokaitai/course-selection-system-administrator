import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import errorHandlerPlugin from './plugins/errorHandler'

createApp(App).use(router).use(errorHandlerPlugin).use(store).mount('#app')
