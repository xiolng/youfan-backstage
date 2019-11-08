import Http from './Http'

export const getShopList = (data) => Http.post('/business/shop/page', data) // 列表
export const getShopListAll = () => Http.get('/business/shop/getlist') // 列表
export const getShopDetail = (params) => Http.get('/business/shop/getById', { params }) // 详情。编辑
export const editShopDetail = data => Http.post('/business/shop/updateById', data) // 编辑
export const saveShop = data => Http.post('/business/shop/save', data) // 新建
export const deleteShop = params => Http.get('/business/shop/removeById', { params }) // 删除
export const deleteShopImg = data => Http.post('/business/shop/removeOneImage', data) // 删除
export const uploadCardImg = data => Http({
  url: '/business/shop/saveOneImage',
  data,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
