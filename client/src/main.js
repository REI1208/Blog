import { createApp, onMounted } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from "./common/router"
import axios from 'axios'
import { createDiscreteApi } from "naive-ui"
import { AdminStore } from './stores/AdminStore'
import naive from 'naive-ui'

const { message, notification, dialog } = createDiscreteApi(
    ["message", "dialog", "notification"]
);
const app = createApp(App)
axios.defaults.baseURL = "/api/";


app.provide("axios", axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", axios.defaults.baseURL)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(naive)

app.mount('#app')
const adminStore = AdminStore()
//axios拦截器添加token
axios.interceptors.request.use((config) => {
    if (config.url.startsWith('/')) {
        config.url = config.url.slice(1); // 去掉开头的 '/'
    }
    console.log('请求路径:', config.url); // 打印最终请求路径
    config.headers.token = adminStore.token;
    return config;
});