import request from '@/utils/request'

export function getListByCode(cfgCode) {
  return request({
    url: '/sysConfig/listByCode',
    method: 'get',
    params: { cfgCode }
  })
}
