import { createStore } from 'vuex';

export default createStore({
    state: {
        userInfo: {},
        isLogin: false
    },
    getters: {
        userInfo: state => {
            state.userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
            return state.userInfo
        },
        isLogin: state => {
            state.isLogin = Boolean(JSON.parse(localStorage.getItem('isLogin') ?? 'false'));
            return state.isLogin
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin
            localStorage.setItem('isLogin', JSON.stringify(isLogin))
        }
    },
    actions: {
    },
    modules: {
    }
})