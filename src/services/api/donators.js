import { authRequest, basicRequest } from 'src/utils/network'

export function registerDonatorApi (params) {
  return basicRequest().post('/signup', params)
}
