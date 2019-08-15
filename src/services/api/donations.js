import { basicRequest } from 'src/utils/network'

export function storeFundDonation (data) {
  return basicRequest().post('/donations', data)
}

export function uploadProofApi (data) {
  const uri = data.image.uri
  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]
  const formData = new FormData()
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    fileName: `photo.${fileType}`,
    type: `image/${fileType}`
  })
  formData.append('id', data.id)
  return basicRequest().post('/donations/proof-upload', formData)
}
