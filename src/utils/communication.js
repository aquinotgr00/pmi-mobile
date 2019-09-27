import Pusher from 'pusher-js/react-native'
import Config from 'react-native-config'

Pusher.logToConsole = Config.IS_PRODUCTION === '0'

export let pusher

export function broadcastAuth (token) {
  pusher = new Pusher(Config.PUSHER_APP_KEY, {
    authEndpoint: `${Config.SERVER_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    cluster: 'ap1',
    forceTLS: true
  })
}
