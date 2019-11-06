import Http from '../Http'

export const getRoleList = () => Http.get('/system/role/getlist') // 全部role

export const getRolePage = (data) => Http.post('/system/role/page', data) // 列表
export const getRoleDetail = (params) => Http.get('/system/role/getById', { params }) // 详情。编辑
export const editRoleDetail = data => Http.post('/system/role/updateById', data) // 编辑
export const saveRole = data => Http.post('/system/role/save', data) // 新建
export const deleteRole = params => Http.get('/system/role/removeById', { params }) // 删除
