import axios from 'axios'
import { basicRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getCampaignListApi (params, cancelToken) {
  params.append('p', 1) // published
  params.append('v', 1) // visible

  if (cancelToken === undefined) {
    cancel && cancel()
  }

  return basicRequest().get('/campaigns', { params,
    cancelToken: cancelToken || new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function getCampaignDetail (id) {
  return basicRequest().get('/campaigns/' + id)
}
