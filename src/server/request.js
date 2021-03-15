import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BASE_URL,
    timeout: 10000 // request timeout
})

//  请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        config.headers['Accept'] = 'application/json'
        config.headers['platform'] = 'pc'
        const token = null
        if (token) {
            // 如果token不为null，则传token给后台
            config.headers['Token'] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data
        // 届时根据后端返回success或者code值判断
        if (res.success === true || parseInt(res.code) === 200) {
            return res
        } else {
            // 根据业务特定返回值做特定处理
            console.log(`接口:'${response.config.url}' 返回状态码: (${res.code}) 错误信息: { ${res.msg} }`)
            message.error(res.msg)
            return Promise.reject(res)
        }
    },
    (err) => {
        // 响应错误
        if (err.response) { // 响应错误码处理
            const status = err.response.status
            let msg = '请求地址出错'
            switch (status) {
                case 400:
                    msg = '请求错误'
                    break
                case 401:
                    msg = '未授权，请登录'
                    break
                case 403:
                    msg = '拒绝访问'
                    break
                case 404:
                    msg = '请求地址出错：' + process.env.REACT_APP_BASE_URL + err.response.config.url
                    break
                case 408:
                    msg = '请求超时'
                    break
                case 500:
                    msg = '服务器异常'
                    break
                case 502:
                    msg = '网关错误'
                    break
                case 503:
                    msg = '服务器不可用'
                    break
                case 504:
                    msg = '网关超时'
                    break
                case 505:
                    msg = 'HTTP版本不受支持'
                    break
                case 405:
                    msg = '请求类型错误'
                    break
                default:
            }
            console.log(msg)
            message.error(msg)

            return Promise.reject(err.response)
        } else if (!window.navigator.online) { // 断网处理
            // todo: jump to offline page
            return -1
        }
        return Promise.reject(err)
    }
)

export default service
