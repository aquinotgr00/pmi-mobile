const user = (state = { token: null, isVolunteer: false, profile: { name: 'test' } }, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
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
