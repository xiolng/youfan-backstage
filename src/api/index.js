import axios from 'axios'

axios.interceptors.request.use(
  config => {
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
