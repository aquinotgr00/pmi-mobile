import { authRequest, basicRequest } from 'src/utils/network'

export function registerDonatorApi (params) {
  console.log(params)
  return basicRequest().post('/signup', params)
}
