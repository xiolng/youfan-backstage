import Http from '../Http'
const BASE_URL = ``

export const getPayList = (data) => Http.post(`${BASE_URL}/business/payInfo/page`, data) // 列表
