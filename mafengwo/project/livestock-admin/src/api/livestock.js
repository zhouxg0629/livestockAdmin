import request from '@/utils/request'

export function getListByPage(params) {
  return request({
    url: '/livestocks',
    method: 'get',
    params
  })
}
