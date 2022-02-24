import request from '@/utils/request'
// import { apiUrl } from "@/api/api";

function queryList(params) {
  return request({
    url: '/api/v1/admin/projectType/query',
    method: 'get',
    params
  })
}

export default {
  queryList
}
