import axios from 'axios'
import { basicRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getCampaignListApi (params) {
  return basicRequest().get('/campaigns', { params })
}
