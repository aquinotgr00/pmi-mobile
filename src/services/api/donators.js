import { authRequest, basicRequest } from 'src/utils/network'

export function registerDonatorApi (params) {
  return basicRequest().post('/signup', params)
}

export function getDonatorProfileApi () {
  return authRequest().get('/profile')
}

export function getDonatorsByCampaignApi (id, page) {
  return basicRequest().get(`/campaigns/${id}/donators?page=${page}`)
}
