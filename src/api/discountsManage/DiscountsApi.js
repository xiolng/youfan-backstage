import Http from '../Http'
const BASE_URL = ``

export const getDiscountsList = (data) => Http.post(`${BASE_URL}/business/discount/page`, data) // 列表
export const getDiscountsDetail = (params) => Http.get(`${BASE_URL}/business/discount/getById`, { params }) // 详情。编辑
export const editDiscountsDetail = data => Http.post(`${BASE_URL}/business/discount/updateById`, data) // 编辑
export const saveDiscounts = data => Http.post(`${BASE_URL}/business/discount/save`, data) // 新建
export const deleteDiscounts = params => Http.get(`${BASE_URL}/business/discount/removeById`, { params }) // 删除
export const getAllDiscounts = () => Http.get(`${BASE_URL}/business/discount/getlist`)
