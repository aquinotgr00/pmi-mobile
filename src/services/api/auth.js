import { authRequest, basicRequest } from 'src/utils/network'

export function loginApi (credentials) {
  return basicRequest().post('/signin', credentials)
}

export function logoutApi () {
  return authRequest().get('/logout')
}