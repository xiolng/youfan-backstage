import Http from '../Http'

export const getDiscountsList = (data) => Http.post('/business/discount/page', data) // 列表
export const getDiscountsDetail = (params) => Http.get('/business/discount/getById', { params }) // 详情。编辑
export const editDiscountsDetail = data => Http.post('/business/discount/updateById', data) // 编辑
export const saveDiscounts = data => Http.post('/business/discount/save', data) // 新建
export const deleteDiscounts = params => Http.get('/business/discount/removeById', { params }) // 删除
export const getAllDiscounts = () => Http.get('/business/discount/getlist')
