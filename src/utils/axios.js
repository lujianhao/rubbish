import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 60000
})

// 异常拦截处理器
const errorHandler = (error) => {
    switch (error.response.status) {
        case 401:
        case 403:
            message.error('登录状态已失效，请重新登录！')
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('userMenus')
            localStorage.removeItem('systemInfo')
            localStorage.removeItem('unitInfo123')
            localStorage.removeItem('unitInfo12')
            localStorage.removeItem('unitInfo23')
            setTimeout(() => {
                window.location.replace(process.env.VUE_APP_URL)
            }, 200)
            break
        case 500:
            message.error('服务器故障！', 1)
            break
    }
    return Promise.reject(error)
}

// 请求
service.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers['token'] = JSON.parse(localStorage.getItem('token'))
    }
    return config
}, errorHandler)

// 响应
service.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data.success ? (response.data.result ? response.data.result : response.data.message) : response.data
    } else {
        message.error(response.data.message)
    }

}, errorHandler)

export default service
export { service as axios }
