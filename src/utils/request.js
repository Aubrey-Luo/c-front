import axios from 'axios'
import store from '@/store'

const service = axios.create({
  // 根据项目的状态自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果 token 存在，注入 token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 添加 icode
    config.headers.icode = '0BCFE77DFEA73516'
    // 必须返回 config
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器：
 * 服务端返回数据之后，前端 .then 之前被调用
 */
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    }
    // TODO: 业务请求错误
    return Promise.reject(new Error(message))
  },
  (error) => {
    // 处理 token 超时问题
    if (error?.response?.data?.code === 401) store.dispatch('user/logout')
    $message('error', error.response.data.message)
  }
)

export default service
