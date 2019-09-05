import { authRequest, basicRequest } from 'src/utils/network'

export function registerVolunteerApi (data) {
	const formData = new FormData()
	for (const key in data) {
		formData.append(key, data[key])
	}
	console.log(formData)
  return basicRequest().post('/volunteer/signup', data)
}

export function getProfileApi () {
	return authRequest().get('/volunteer/profile')
}

export function updateProfileApi (id, data) {
	return authRequest().post(`/volunteer/update/${id}`, data)
}
