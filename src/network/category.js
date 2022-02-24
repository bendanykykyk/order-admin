import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/category/queryList',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

function queryDetail(data) {
  return request({
    url: '/category/detail',
    method: 'post',
    data
  })
}

function updateData(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}

function deleteData(data) {
  return request({
    url: '/category/delete',
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
