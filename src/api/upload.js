import request from '@/utils/request'

export function uploadPic(data) {
  return request({
    url: '/api/v1/files/uploadFiles',
    method: 'post',
    'content-type': 'multipart/form-data',
    data
  })
}
