import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/v1/users/page/' + params.pageNum +'/' + params.pageSize,
    method: 'get'
  })
}
