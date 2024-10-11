export default {
    install(app) {
        // 全局异常处理
        app.config.errorHandler = (err, vm, info) => {
            ElMessage.error(err.message)
        }

        // 捕获未处理的 Promise 异常
        window.addEventListener('unhandledrejection', (event) => {
            event.preventDefault()
            ElMessage.error(event.reason.message)
        })
    }
}