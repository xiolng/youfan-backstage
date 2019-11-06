import Http from '../Http'

export const getCardMessageList = (data) => Http.post('/business/cardVolumeBasics/page', data) // 列表
export const getCardMessageDetail = (params) => Http.get('/business/cardVolumeBasics/getById', { params }) // 详情。编辑
export const editCardMessageDetail = data => Http.post('/business/cardVolumeBasics/updateById', data) // 编辑
export const saveCardMessage = data => Http.post('/business/cardVolumeBasics/save', data) // 新建
export const deleteCardMessage = params => Http.get('/business/cardVolumeBasics/removeById', { params }) // 删除
export const getAllCardMessageList = params => Http.get('/business/cardVolumeBasics/getlist', { params }) // 查询所有
