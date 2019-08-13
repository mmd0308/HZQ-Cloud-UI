import request from '@/utils/request'

const path = '/v1/roles'

export function page(params) {
  return request({
    url: path + '/page/' + params.pageNum +'/' + params.pageSize,
    method: 'get'
  })
}

export function create(params) {
  return request({
    url:  path,
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: path + '/' + params.id,
    method: 'put',
    data: params
  })
}