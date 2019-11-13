import Http from './Http'
const BASE_URL = ``

export const setLogin = data => Http.post(`${BASE_URL}/login/signin`, data)
export const setOutLogin = params => Http.get(`${BASE_URL}/login/signout`, { params })
export const getUserDetail = params => Http.get(`${BASE_URL}/system/user/getLoginInfo`, { params })
