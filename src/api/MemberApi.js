import Http from './Http'

export const getMemberList = data => Http.post('/business/member/page', data)
