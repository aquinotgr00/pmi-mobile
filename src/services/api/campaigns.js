import axios from 'axios'
import { basicRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getCampaignListApi (t) {
    return basicRequest().get('/app/campaigns?t='+t)
}
