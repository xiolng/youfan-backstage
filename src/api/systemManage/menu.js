import Http from '../Http'

export const getMenuList = () => Http.get('/system/menu/getlist') // 获取菜单
export const getMenuPage = (data) => Http.post('/system/menu/page', data) // 列表
export const getMenuDetail = (params) => Http.get('/system/menu/getById', { params }) // 详情。编辑
export const editMenuDetail = data => Http.post('/system/menu/updateById', data) // 编辑
export const saveMenu = data => Http.post('/system/menu/save', data) // 新建
export const deleteMenu = params => Http.get('/system/menu/removeById', { params }) // 删除
