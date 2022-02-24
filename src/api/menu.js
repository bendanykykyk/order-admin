import request from '@/utils/request'

export function queryMenuList(params) {
  return request({
    url: '/api/v1/admin/auth',
    method: 'get',
    params
  })
}
