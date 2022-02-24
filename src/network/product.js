import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/product/queryList',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

function queryDetail(data) {
  return request({
    url: '/product/detail',
    method: 'post',
    data
  })
}

function updateData(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}

function deleteData(data) {
  return request({
    url: '/product/delete',
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
