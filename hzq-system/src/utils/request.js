import axios from 'axios'
import { Message } from 'element-ui'
//import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://localhost:9000',
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    const token = getToken()
    console.log(token)
    console.log(isToken)
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // token
    }
    return config
  },
  error => {
    // do something with request error
    //   console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
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
      // 请求成功
      return res.data
    }
  },
  error => {
    // dd  console.log('err' + error) // for debug
    Message({
      message: 'request response: ' + error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
