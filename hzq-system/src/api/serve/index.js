import request from '@/utils/request'

const path = '/api/base/v1/serves'

export function serveList(params) {
  return request({
    url: path,
    method: 'get',
    params: params
  })
}
