import axios from '../index'

export const getUserList = (data) => axios.post('/system/user/page', data) // 用户列表
export const getUserDetail = (params) => axios.get('/system/user/getById', { params }) // 用户详情。编辑
export const editUserDetail = data => axios.post('/system/user/updateById', data) // 编辑用户
export const saveUser = data => axios.post('/system/user/save', data) // 新建用户
export const deleteUser = params => axios.get('/system/user/removeById', { params }) // 删除用户
