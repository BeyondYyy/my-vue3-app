import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    return http.get('/code', params)
  },
}

export default loginApi
