import Http from './Http'

export const setLogin = data => Http.post('/login/signin', data)
export const setOutLogin = params => Http.get('/login/signout', { params })
export const getUserDetail = params => Http.get('/system/user/getLoginInfo', { params })
