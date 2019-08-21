import request from '@/utils/request'

const path = '/api/log/v1/login'

export function loginLogPage(params) {
  return request({
    url: path + '/page/' + params.pageNum + '/' + params.pageSize,
    method: 'get'
  })
}
