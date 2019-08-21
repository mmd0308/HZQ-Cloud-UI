import request from '@/utils/request'
export function login(username, password) {
  const grant_type = 'password'

  return request({
    url: '/oauth/token',
    method: 'post',
    headers: {
      Authorization:
        'Basic aHpxLWNsb3VkLXVpOjU5MjQyZWE0MTA0MDkyYzUxMGQyNGEwODgyYjk2Njlk'
    },
    params: {
      username,
      password,
      grant_type: grant_type
    }
  })
}
