import axios from './index'

export const setLogin = data => axios.post('/api/auth/signin', data)
