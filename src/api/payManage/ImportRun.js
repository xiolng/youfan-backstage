import Http from '../Http'
const BASE_URL = ``

export const getImportList = (data) => Http.post(`${BASE_URL}/business/importBatch/page`, data) // 列表
