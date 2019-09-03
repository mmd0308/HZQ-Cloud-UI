import request from '@/utils/request'

const path = '/api/system/v1/menus'

export function tree(params) {
  return request({
    url: path + '/tree',
    method: 'get',
    params: { serveId: params }
  })
}

export function checkPermission(params) {
  return request({
    url: path + '/permission/' + params.permission,
    method: 'get',
    params: { id: params.id }
  })
}