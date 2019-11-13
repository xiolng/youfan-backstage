import Http from './Http'
const BASE_URL = ``

export const getMemberList = data => Http.post(`${BASE_URL}/business/member/page`, data)
export const importMember = data => Http({
  url: `${BASE_URL}/business/excelOperation/importMemberInfo`,
  method: 'post',
  data,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
