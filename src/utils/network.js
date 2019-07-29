import axios from 'axios'
import Config from 'react-native-config'

const axiosInstanceDefaults = {
  baseURL: Config.SERVER_URL + '/' + Config.API_PREFIX
}

export const basicRequest = () => {
  const basicAxios = axios.create(axiosInstanceDefaults)
  return basicAxios
}

let authToken

export function setAuthToken (token) {
  authToken = token
}

export function authRequest () {
  const authAxios = axios.create(axiosInstanceDefaults)
  authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken
  return authAxios
}
