import { basicRequest } from 'src/utils/network'

export function registerVolunteerApi (data) {
	console.log(data)
	const formData = new FormData()
	for (const key in data) {
		formData.append(key, data[key])
	}
	console.log(formData)
  return basicRequest().post('/volunteer/signup', data)
}
