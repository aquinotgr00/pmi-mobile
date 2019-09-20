import { authRequest, basicRequest } from 'src/utils/network'

export function loginApi (credentials) {
  return basicRequest().post('/signin', credentials)
}

export function logoutApi () {
  return authRequest().get('/logout')
}

export function resetPasswordApi (data) {
  return basicRequest().post('/password/reset', data)
}

export function emailValidationApi (data) {
  return basicRequest().post('/email-validate', data)
}
