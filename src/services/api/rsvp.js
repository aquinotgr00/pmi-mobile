import { authRequest } from 'src/utils/network'

export function getRsvpDetailApi (id) {
	return authRequest().get(`/events/report/${id}`)
}