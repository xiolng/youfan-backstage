import Http from './Http'
const BASE_URL = ``

export const getCardList = params => Http.get(`${BASE_URL}/business/cardVolume/selectCardVolumeSum`, { params }) // 列表
export const createCard = data => Http.post(`${BASE_URL}/business/cardVolume/createCardVolume`, data) // 新建
export const cardExport = data => Http({
  url: `${BASE_URL}/business/excelOperation/exportCardVolumeInfo`,
  data,
  method: 'post',
  responseType: 'blob'
})
// 卡券码状态
export const getCardStatus = params => Http.get(`${BASE_URL}/business/cardVolume/getBySerialNumber`, { params })
