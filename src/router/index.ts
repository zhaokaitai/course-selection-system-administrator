import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'helloword',
        component: HelloWorld
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.path !== '/') {
        return '/'
    }
})

export default router