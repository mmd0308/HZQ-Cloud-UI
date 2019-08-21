import request from '@/utils/request'

const path = '/api/base/v1/roles'

export function page(params) {
  return request({
    url: path + '/page/' + params.pageNum + '/' + params.pageSize,
    method: 'get'
  })
}

export function listResourceByRoleId(id) {
  return request({
    url: path + '/resource/' + id,
    method: 'get'
  })
}

export function createRoleResource(params) {
  return request({
    url: path + '/resource',
    method: 'post',
    data: params
  })
}

export function updateBatchRoleResources(params) {
  return request({
    url: path + '/resource',
    method: 'put',
    data: params
  })
}
export function create(params) {
  return request({
    url: path,
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

export function tree(params) {
  return request({
    url: path + '/tree',
    method: 'get',
    params: params
  })
}
