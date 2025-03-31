import axios from 'axios'

import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求头中添加 token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    // 处理响应数据
    if (data.code !== 200) {
      message.error(data.message || 'Error')
      return Promise.reject(new Error(data.message || 'Error'))
    }
    return data
  },
  (error) => {
    // 处理响应错误
    console.error('Response error:', error)
    const { response } = error
    if (response) {
      const { status } = response
      if (status === 401) {
        message.error('Unauthorized, please login again')
        history.push('/login')
      } else {
        message.error(response.data.message || 'Error')
      }
    } else {
      message.error('Network Error')
    }
    return Promise.reject(error)
  },
)

export default service
