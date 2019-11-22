import Http from './Http'
const BASE_URL = ``

export const getShopList = (data) => Http.post(`${BASE_URL}/business/shop/page`, data) // 列表
export const getShopListAll = () => Http.get(`${BASE_URL}/business/shop/getShopIdNameList`) // 列表
export const getShopDetail = (params) => Http.get(`${BASE_URL}/business/shop/getById`, { params }) // 详情。编辑
export const editShopDetail = data => Http.post(`${BASE_URL}/business/shop/updateById`, data) // 编辑
export const saveShop = data => Http.post(`${BASE_URL}/business/shop/save`, data) // 新建
export const deleteShop = params => Http.get(`${BASE_URL}/business/shop/removeById`, { params }) // 删除
export const deleteShopImg = data => Http.post(`${BASE_URL}/business/shop/removeOneImage`, data) // 删除
export const uploadCardImg = data => Http({
  url: `${BASE_URL}/business/shop/saveOneImage`,
  data,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
