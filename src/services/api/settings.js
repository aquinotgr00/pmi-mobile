import { basicRequest } from 'src/utils/network'

export function checkSettingUpdateApi () {
  return basicRequest().get('/settings/check-for-update')
}

export function downloadAreaData (name) {
    return basicRequest().get('/settings/'+ name)
}