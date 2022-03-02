import request from '@/utils/request'

function queryList(params) {
  return request({
    url: '/order/queryList',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}

function queryDetail(data) {
  return request({
    url: '/order/detail',
    method: 'post',
    data
  })
}

function updateData(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}

function deleteData(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}
function status(data) {
  return request({
    url: '/order/status',
    method: 'post',
    data
  })
}

export default {
  queryList,
  append,
  queryDetail,
  updateData,
  deleteData,
  status
}
