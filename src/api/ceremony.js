import request from '@/utils/request'

function append(data) {
  return request({
    url: '/api/v1/admin/monlam/add',
    method: 'post',
    data
  })
}

function queryDetail(params) {
  return request({
    url: '/api/v1/admin/monlam/details',
    method: 'get',
    params
  })
}

function updateData(data) {
  return request({
    url: '/api/v1/admin/monlam/update',
    method: 'post',
    data
  })
}

export default {
  append,
  queryDetail,
  updateData
}
