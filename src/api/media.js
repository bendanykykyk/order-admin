import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/api/v1/admin/news/query',
    method: 'get',
    params
  })
}

export default {
  queryList
}
