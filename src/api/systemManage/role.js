import Http from '../Http'
const BASE_URL = ``

export const getRoleList = () => Http.get(`${BASE_URL}/system/role/getlist`) // 全部role

export const getRolePage = (data) => Http.post(`${BASE_URL}/system/role/page`, data) // 列表
export const getRoleDetail = (params) => Http.get(`${BASE_URL}/system/role/getById`, { params }) // 详情。编辑
export const editRoleDetail = data => Http.post(`${BASE_URL}/system/role/updateById`, data) // 编辑
export const saveRole = data => Http.post(`${BASE_URL}/system/role/save`, data) // 新建
export const deleteRole = params => Http.get(`${BASE_URL}/system/role/removeById`, { params }) // 删除
