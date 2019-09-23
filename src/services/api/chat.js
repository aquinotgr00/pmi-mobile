import axios from 'axios'
import { authRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getEventActivityApi (params, cancelToken) {
  if (cancelToken === undefined) {
    cancel && cancel()
  }

  return authRequest().get('/events/comment', { params,
    cancelToken: cancelToken || new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function postEventActivityApi (id) {
  return authRequest().post(`/events/comment`)
}
