import axios, { type AxiosResponse } from 'axios'
import { ERROR_MESSAGE } from '@/constant'

const req = axios.create({
  baseURL: 'http://localhost:9090'
})

req.interceptors.request.use(
  (config) => {
    const identityStore = useIdentityStore()
    if (identityStore.identity.token) {
      config.headers.Authorization = identityStore.identity.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

req.interceptors.response.use(
  async function (response: AxiosResponse<API.BaseResponse<any>>) {
    const base = response.data
    // if (base.code !== 0) {
    //   ElMessage.error(ERROR_MESSAGE)
    //   return Promise.reject(base.message)
    // }
    if (base.message) {
      ElMessage({
        type: 'success',
        message: SUCCESS_MESSAGE,
        grouping: true
      })
    }
    return response
  },
  function (error) {
    if (error?.response?.data?.code === 401) {
      router.push('/login')
    }
    ElMessage.error(error?.response?.data?.message)
    return Promise.reject(error)
  }
)

export default req
