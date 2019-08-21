import request from '@/utils/request'

const path = '/api/base/v1/menus'

export function tree(params) {
  return request({
    url: path + '/tree',
    method: 'get',
    params: { serveId: params }
  })
}
