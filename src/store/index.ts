import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
        isLogin: false
    },
    getters: {
        token: state => state.token,
        isLogin: state => state.isLogin
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin
        }
    },
    actions: {
    },
    modules: {
    }
})