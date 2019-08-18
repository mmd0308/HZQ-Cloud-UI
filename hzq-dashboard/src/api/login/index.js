import request from '@/utils/request'
export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}
