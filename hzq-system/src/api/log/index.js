import request from '@/utils/request'

const loginPath = '/api/log/v1/login'


const OperPath = '/api/log/v1/operation'


export function loginLogPage(params) {
  return request({
    url: loginPath + '/page/' + params.pageNum + '/' + params.pageSize,
    method: 'get'
  })
}


export function OperationLogPage(params) {
  return request({
    url: OperPath + '/page/' + params.pageNum + '/' + params.pageSize,
    method: 'get'
  })
}

