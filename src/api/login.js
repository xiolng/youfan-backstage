import Http from './Http'

export const setLogin = data => Http.post('/api/auth/signin', data)
