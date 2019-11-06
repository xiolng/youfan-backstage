import Http from '../Http'

export const getUserList = (data) => Http.post('/system/user/page', data) // 用户列表
export const getUserDetail = (params) => Http.get('/system/user/getById', { params }) // 用户详情。编辑
export const editUserDetail = data => Http.post('/system/user/updateById', data) // 编辑用户
export const saveUser = data => Http.post('/system/user/save', data) // 新建用户
export const deleteUser = params => Http.get('/system/user/removeById', { params }) // 删除用户
