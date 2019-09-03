import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    const token = store.getters.access_token
    console.log(token)
    console.log(isToken)
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      const res = response.data
      // 请求出错
      if (res.code !== '10000') {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res.data
      }
    } else {
      // 请求成功
      return response.data
    }
  },
  error => {
    Message({
      message: 'request response: ' + error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
