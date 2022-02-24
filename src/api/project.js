import request from '@/utils/request'

function queryDetail(params) {
  return request({
    url: '/api/v1/admin/project/details',
    method: 'get',
    params
  })
}

export default {
  queryDetail
}
