import axios from 'axios'
import { authRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getRsvpListApi (params, cancelToken) {
  if (cancelToken === undefined) {
    cancel && cancel()
  }

  return authRequest().get('/events/report', { params,
    cancelToken: cancelToken || new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function getRsvpDetailApi (id) {
  return authRequest().get(`/events/report/${id}`)
}
