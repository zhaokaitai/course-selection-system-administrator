import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
import HomeView from '../components/HomeView.vue'
import LoginView from '../components/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    }, {
        path: '/home',
        name: 'home',
        component: HomeView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.name !== 'login' && !store.getters.isLogin) {
        ElMessage.error('请先登录');
        return '/'
    }
})

export default router