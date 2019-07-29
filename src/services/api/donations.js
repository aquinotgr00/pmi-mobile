import axios from 'axios'
import { basicRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function storeFundDonation (data) {
  return basicRequest().post('/donations/create', data)
}

export function uploadProofApi (data) {
  return basicRequest().post('/donations/proof-upload', data)
}
