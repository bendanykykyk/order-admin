import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/merchant/query',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/merchant/add',
    method: 'post',
    data
  })
}

function queryDetail(params) {
  return request({
    url: '/merchant/detail',
    method: 'get',
    params
  })
}

function updateData(data) {
  return request({
    url: '/merchant/update',
    method: 'post',
    data
  })
}

function deleteData(data) {
  return request({
    url: '/api/merchant/delete',
    method: 'post',
    data
  })
}

export default {
  queryList,
  append,
  queryDetail,
  updateData,
  deleteData
}
