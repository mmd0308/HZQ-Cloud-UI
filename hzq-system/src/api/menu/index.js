import request from '@/utils/request'

const path = '/api/system/v1/menus'

export function tree(params) {
  return request({
    url: path + '/tree',
    method: 'get',
    params: { serveId: params }
  })
}
