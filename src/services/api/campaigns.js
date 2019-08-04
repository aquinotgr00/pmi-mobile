import axios from 'axios'
import { basicRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getCampaignListApi (params) {
  params.append('p', 1) // published
  params.append('h', 0) // visible
  return basicRequest().get('/campaigns', { params })
}

export function getCampaignDetail (id) {
  return basicRequest().get('/campaigns/' + id)
}
