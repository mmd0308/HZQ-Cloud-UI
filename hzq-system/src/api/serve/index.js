import request from '@/utils/request'

const path = '/api/system/v1/serves'

export function serveList(params) {
  return request({
    url: path,
    method: 'get',
    params: params
  })
}

export function checkPermission(params) {
  return request({
    url: path + '/permission/' + params.permission,
    method: 'get',
    params: { id: params.id }
  })
}