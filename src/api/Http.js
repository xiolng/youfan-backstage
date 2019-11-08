import axios from 'axios'

const Http = axios.create({
  timeout: 10000,
})
Http.interceptors.request.use(
  config => {
    let isLogin = config.url.indexOf('login')
    const token = localStorage.getItem('accessToken')
    if (isLogin <= -1) {
      if (!token) {
        location.href = '/#/login'
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
