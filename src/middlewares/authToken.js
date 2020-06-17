import { setAuthToken } from 'src/utils/network'
import { broadcastAuth } from 'src/utils/communication'

export default (store) => next => action => {
  switch (action['type']) {
    case 'LOGIN_SUCCESS':
    case 'USER_REGISTRATION_SUCCESS':
      setAuthToken(action.token)
      broadcastAuth(action.token)
      return next(action)
    case 'persist/REHYDRATE':
      const result = next(action)
      const { token } = store.getState().user
      if (token) {
        setAuthToken(token)
        broadcastAuth(token)
      }
      return result
    case 'LOGOUT_SUCCESS':
      setAuthToken(null)
      return next(action)
    default:
      return next(action)
  }
}
