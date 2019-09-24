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

export function createRsvpApi (data) {
  const { title, description, image } = data
  const uri = image.uri
  const fileType = uri.split('.').pop()

  const formData = new FormData()
  formData.append('image_file', {
    uri,
    name: `image.${fileType}`,
    fileName: `image.${fileType}`,
    type: `image/${fileType}`
  })
  formData.append('title', title)
  formData.append('description', description)
  
  return authRequest().post('/events/report', formData)
}

export function getRsvpDetailApi (id) {
  return authRequest().get(`/events/report/${id}`)
}
