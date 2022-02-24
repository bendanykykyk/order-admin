import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/unit/queryList',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/unit/add',
    method: 'post',
    data
  })
}

function queryDetail(data) {
  return request({
    url: '/unit/detail',
    method: 'post',
    data
  })
}

function updateData(data) {
  return request({
    url: '/unit/update',
    method: 'post',
    data
  })
}

function deleteData(data) {
  return request({
    url: '/unit/delete',
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
