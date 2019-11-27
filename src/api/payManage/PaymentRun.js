import Http from '../Http'
const BASE_URL = ``

export const getPaymentList = (data) => Http.post(`${BASE_URL}/business/saleRecord/page`, data) // 列表
