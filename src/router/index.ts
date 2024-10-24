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
        component: HomeView,
        children: [
            {
                path: '/userinfo',
                name: 'userinfo',
                component: () => import('../components/UserInfoView.vue')
            },{
                path: '/timeset',
                name: 'timeset',
                component: () => import('../components/SetTimeView.vue')
            },{
                path: '/house',
                name: 'house',
                component: () => import('../components/HouseView.vue')
            },{
                path: '/importData',
                name: 'importData',
                component: () => import('../components/ImportDataView.vue')
            },{
                path: '/assessSituation',
                name: 'assessSituation',
                component: () => import('../components/AssessSituationView.vue')
            }
        ]
    }, {
        path: '/resetPassword',
        name: 'resetPassword',
        component: () => import('../components/ResetPasswordView.vue')
    }, {
        path: '/404',
        name: '404',
        component: () => import('../components/404View.vue')
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.name !== 'login' && to.name !== 'resetPassword' && !store.getters.isLogin) {
        ElMessage.error('请先登录');
        return '/'
    }

    if (to.name === 'login' && store.getters.isLogin) {
        return '/home'
    }
})

export default router;