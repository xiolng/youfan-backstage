import Http from '../Http'

export const getPayList = (data) => Http.post('/business/payInfo/page', data) // 列表
