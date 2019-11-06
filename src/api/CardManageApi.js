import Http from './Http'

export const getCardList = (data) => Http.post('/business/cardVolume/page', data) // 列表
export const saveCard = data => Http.post('/business/cardVolume/save', data) // 新建
export const cardExport = params => Http.get('/business/excelOperation/exportCardVolumeInfo', { params })
