import Http from '../Http'
const BASE_URL = ``

export const getUserList = (data) => Http.post(`${BASE_URL}/system/user/page`, data) // 用户列表
export const getUserDetail = (params) => Http.get(`${BASE_URL}/system/user/getById`, { params }) // 用户详情。编辑
export const editUserDetail = data => Http.post(`${BASE_URL}/system/user/updateById`, data) // 编辑用户
export const saveUser = data => Http.post(`${BASE_URL}/system/user/save`, data) // 新建用户
export const deleteUser = params => Http.get(`${BASE_URL}/system/user/removeById`, { params }) // 删除用户
