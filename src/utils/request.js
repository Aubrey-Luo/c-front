import axios from 'axios'

const service = axios.create({
  // 根据项目的状态自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = '01C583E2C21EC3BA'
  // 必须返回 config
  return config
})

export default service
