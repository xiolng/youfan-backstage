import Http from './Http'

export const getCardList = params => Http.get('/business/cardVolume/selectCardVolumeSum', { params }) // 列表
export const createCard = data => Http.post('/business/cardVolume/createCardVolume', data) // 新建
export const cardExport = data => Http({
  url: '/business/excelOperation/exportCardVolumeInfo',
  data,
  method: 'post',
  responseType: 'blob'
})
// 卡券码状态
export const getCardStatus = params => Http.get('/business/cardVolume/getBySerialNumber', { params })
