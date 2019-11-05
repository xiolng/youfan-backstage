import axios from 'axios'

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzODg1ODE1ODBmZGY5M2RlZGQyY2NlNDIzYzJhNWNhMSIsImlhdCI6MTU3Mjg1MDcyMywiZXhwIjoxNTczNDU1NTIzfQ.rWQfoCamHlSLCi6PXl9LEjSnRVsnb5GXJQHSWqjmVCoPsTh5TTnf9xRZdDfJayeiViuZ9Pq0Kz5HGWOtBhcHGA`
    return config
  },
  error => {
    return error
  })

axios.interceptors.response.use(
  config => {
    return config
  },
  error => {
    return error
  })

export default axios
