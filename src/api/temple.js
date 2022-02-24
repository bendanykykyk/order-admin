import request from '@/utils/request'
// import { apiUrl } from "@/api/api";

function queryList(params) {
  return request({
    url: '/api/v1/admin/tenant/query',
    method: 'get',
    params
  })
}

function append(data) {
  return request({
    url: '/api/v1/admin/tenant/add',
    method: 'post',
    data
  })
}

function getDetailData(params) {
  return request({
    url: '/api/v1/admin/hardware/node/details',
    method: 'get',
    params
  })
}

function updateData(data) {
  return request({
    url: '/api/v1/admin/tenant/update',
    method: 'post',
    data
  })
}

function deleteData(params) {
  return request({
    url: '/api/v1/admin/hardware/node/delete',
    method: 'delete',
    params
  })
}

export default {
  queryList,
  append,
  getDetailData,
  updateData,
  deleteData
}
