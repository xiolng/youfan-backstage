import axios from '../index'

export const getRoleList = () => axios.get('/system/role/getlist') // 全部role

export const getRolePage = (data) => axios.post('/system/role/page', data) // 列表
export const getRoleDetail = (params) => axios.get('/system/role/getById', { params }) // 详情。编辑
export const editRoleDetail = data => axios.post('/system/role/updateById', data) // 编辑
export const saveRole = data => axios.post('/system/role/save', data) // 新建
export const deleteRole = params => axios.get('/system/role/removeById', { params }) // 删除
