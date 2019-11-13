import Http from '../Http'
const BASE_URL = ``

export const getMenuList = () => Http.get(`${BASE_URL}/system/menu/getlist`) // 获取菜单
export const getMenuPage = (data) => Http.post(`${BASE_URL}/system/menu/page`, data) // 列表
export const getMenuDetail = (params) => Http.get(`${BASE_URL}/system/menu/getById`, { params }) // 详情。编辑
export const editMenuDetail = data => Http.post(`${BASE_URL}/system/menu/updateById`, data) // 编辑
export const saveMenu = data => Http.post(`${BASE_URL}/system/menu/save`, data) // 新建
export const deleteMenu = params => Http.get(`${BASE_URL}/system/menu/removeById`, { params }) // 删除
