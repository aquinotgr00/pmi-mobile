import { loginApi, logoutApi, registerDonatorApi } from 'src/services/api'
import { persistor } from 'src/store'
import NavigationService from 'src/services/NavigationService'

export function login (credentials) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'LOGIN_REQUEST',
      credentials
    })

    try {
      const loginResponse = await loginApi(credentials)

      const { status, data } = loginResponse.data
      if (status === 'success') {
        const { access_token: token } = data
        dispatch({
          type: 'LOGIN_SUCCESS',
          token
        })
        NavigationService.navigate('DonatorNavigator')
      } else {
        const { account } = data
        dispatch({
          type: 'LOGIN_FAILURE',
          account
        })
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        account: 'Server Error'
      })
    }
  }
}

export function registerDonator (user) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'REGISTER_DONATOR_REQUEST'
    })

    try {
      const registerDonatorResponse = await registerDonatorApi(user)

      const { status, data } = registerDonatorResponse.data
      if (status === 'success') {
        const { access_token: token } = data
        dispatch({
          type: 'REGISTER_DONATOR_SUCCESS',
          token
        })
      } else {
        dispatch({
          type: 'REGISTER_DONATOR_FAILURE'
        })
      }
    } catch (error) {
      dispatch({
        type: 'REGISTER_DONATOR_FAILURE',
        account: 'Server Error'
      })
    }
  }
}

export function logout () {
  return async function (dispatch, getState) {
    dispatch({
      type: 'LOGOUT_REQUEST'
    })

    const logoutResponse = await logoutApi()
    const { status } = logoutResponse.data
    if (status === 'success') {
      persistor.purge()
      dispatch({
        type: 'LOGOUT_SUCCESS'
      })
    }
  }
}
