import axios from 'axios'

const Http = axios.create({
  timeout: 10000,
})
Http.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzODg1ODE1ODBmZGY5M2RlZGQyY2NlNDIzYzJhNWNhMSIsImlhdCI6MTU3Mjg1MDcyMywiZXhwIjoxNTczNDU1NTIzfQ.rWQfoCamHlSLCi6PXl9LEjSnRVsnb5GXJQHSWqjmVCoPsTh5TTnf9xRZdDfJayeiViuZ9Pq0Kz5HGWOtBhcHGA`
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
