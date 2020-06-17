import { authRequest, basicRequest } from 'src/utils/network'

export function registerVolunteerApi (data) {
  const formData = new FormData()
  const uri = data.image.uri
  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]
	for (const key in data) {
		formData.append(key, data[key])
  }
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    fileName: `photo.${fileType}`,
    type: `image/${fileType}`
  })
  console.log(formData)
  return basicRequest().post('/volunteer/signup', formData)
}

export function getProfileApi () {
	return authRequest().get('/volunteer/profile')
}

export function updateProfileApi (id, data) {
	return authRequest().post(`/volunteer/update/${id}`, data)
}
