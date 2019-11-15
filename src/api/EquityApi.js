import Http from './Http'
const BASE_URL = ``

export const getEquityList = (data) => Http.post(`${BASE_URL}/business/equity/page`, data) // 列表
export const getEquityListAll = () => Http.get(`${BASE_URL}/business/equity/getlist`) // 列表
export const getEquityDetail = (params) => Http.get(`${BASE_URL}/business/equity/getById`, { params }) // 详情。编辑
export const editEquityDetail = data => Http.post(`${BASE_URL}/business/equity/updateById`, data) // 编辑
export const saveEquity = data => Http.post(`${BASE_URL}/business/equity/save`, data) // 新建
export const deleteEquity = params => Http.get(`${BASE_URL}/business/equity/removeById`, { params }) // 删除
export const deleteEquityImg = data => Http.post(`${BASE_URL}/business/equity/removeOneImage`, data) // 删除
export const uploadCardImg = data => Http({
  url: `${BASE_URL}/business/equity/saveOneImage`,
  data,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
