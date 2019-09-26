const user = (state = { token: null, isVolunteer: false, pushNotificationUserId: null }, action) => {
  switch (action.type) {
    case 'SET_PUSH_NOTIFICATION_ID':
      const { payload:pushNotificationUserId } = action
      return { ...state, pushNotificationUserId}
    case 'LOGIN_REQUEST':
      return { ...state, isLoggingIn: true, loginError: null }
    case 'REGISTER_DONATOR_REQUEST':
    case 'REGISTER_VOLUNTEER_REQUEST':
      return { ...state, isLoggingIn: true, loginError: null }
    case 'LOGIN_SUCCESS':
      const { token, isVolunteer } = action
      return { ...state, isLoggingIn: false, token, isVolunteer }
    case 'REGISTER_DONATOR_SUCCESS':
      return { ...state, isLoggingIn: false, token: action.token }
    case 'REGISTER_VOLUNTEER_SUCCESS':
      return { ...state, isLoggingIn: false, token: action.token, isVolunteer:true }
    case 'LOGIN_FAILURE':
      return { ...state, isLoggingIn: false, loginError: action.account }
    case 'REGISTER_DONATOR_FAILURE':
    case 'REGISTER_VOLUNTEER_FAILURE':
      return { ...state, isLoggingIn: false, loginError: action.account }
    case 'LOGOUT_SUCCESS':
      return { token: null, isVolunteer:false }
    default:
      return state
  }
}

export default user
