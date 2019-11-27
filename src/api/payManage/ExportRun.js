import Http from '../Http'
const BASE_URL = ``

export const getExportList = (data) => Http.post(`${BASE_URL}/business/exportBatch/page`, data) // 列表
