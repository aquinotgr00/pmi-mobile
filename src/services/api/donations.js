import axios from 'axios'
import { basicRequest } from 'src/utils/network'
import Config from 'react-native-config'

const axiosInstanceDefaults = {
  baseURL: Config.SERVER_URL + '/' + Config.API_PREFIX,
  headers: {'Accept': 'application/json', 'Content-Type':'multipart/form-data'}
}

const CancelToken = axios.CancelToken
let cancel

export function storeFundDonation (data) {
  return basicRequest().post('/donations/create', data)
}

export function uploadProofApi (data) {
  const uri = data.image.uri;
  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]
  const formData = new FormData()
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    fileName: `photo.${fileType}`,
    type: `image/${fileType}`,
  })
  formData.append('id', data.id)
  return basicRequest().post('/donations/proof-upload', formData)
}
