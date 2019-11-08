import Http from './Http'

export const getMemberList = data => Http.post('/business/member/page', data)
export const importMember = data => Http({
  url: '/business/excelOperation/importMemberInfo',
  method: 'post',
  data,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
