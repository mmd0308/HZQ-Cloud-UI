import request from '@/utils/request'
export function login(username, password) {
  const grant_type = 'password'

  return request({
    url: '/api/auth/oauth/token',
    method: 'post',
    headers: {
      Authorization: 'Basic aHpxLWNsb3VkLXVpOnd3dy5oenFpbmcuY29t'
    },
    params: {
      username,
      password,
      grant_type: grant_type
    }
  })
}
