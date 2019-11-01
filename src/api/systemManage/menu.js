import axios from '../index'

export const getMenuList = () => axios.get('/system/menu/getlist') // 获取菜单
export const getMenuPage = (data) => axios.post('/system/menu/page', data) // 列表
export const getMenuDetail = (params) => axios.get('/system/menu/getById', { params }) // 详情。编辑
export const editMenuDetail = data => axios.post('/system/menu/updateById', data) // 编辑
export const saveMenu = data => axios.post('/system/menu/save', data) // 新建
export const deleteMenu = params => axios.get('/system/menu/removeById', { params }) // 删除
