const user = (state = { isLoggingIn: false, token: null, loginError: null }, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_DONATOR_REQUEST':
      return { ...state, isLoggingIn: true, loginError: null }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_DONATOR_SUCCESS':
      return { ...state, isLoggingIn: false, token: action.token }
    case 'LOGIN_FAILURE':
    case 'REGISTER_DONATOR_FAILURE':
      return { ...state, isLoggingIn: false, loginError: action.account }
    case 'LOGOUT_SUCCESS':
      return { token: null }
    default:
      return state
  }
}

export default user
