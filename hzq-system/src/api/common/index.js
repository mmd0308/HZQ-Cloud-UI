import request from '@/utils/request'

const path = '/base/v1/'

export function list(moudle, params) {
  return request({
    url: path + moudle,
    method: 'get',
    params: params
  })
}

export function page(moudle, params) {
  return request({
    url: path + moudle + '/page/' + params.pageNum + '/' + params.pageSize,
    method: 'get',
    params: params
  })
}

export function create(moudle, params) {
  return request({
    url: path + moudle,
    method: 'post',
    data: params
  })
}

export function update(moudle, params) {
  return request({
    url: path + moudle + '/' + params.id,
    method: 'put',
    data: params
  })
}

export function deleteById(moudle, id) {
  return request({
    url: path + moudle + '/' + id,
    method: 'DELETE'
  })
}
