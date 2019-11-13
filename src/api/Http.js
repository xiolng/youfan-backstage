import axios from 'axios'
const BASE_URL = ''
const Http = axios.create({
  timeout: 10000,
  baseURL: BASE_URL
})
Http.interceptors.request.use(
  config => {
    let isLogin = config.url.indexOf('login')
    const token = localStorage.getItem('accessToken')
    if (isLogin <= -1) {
      if (!token) {
        location.href = '/#/signin'
      }
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return error
  })

Http.interceptors.response.use(
  config => {
    return config
  },
  error => {
    return error
  })

export default Http
