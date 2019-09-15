import { loginApi, logoutApi, registerDonatorApi, registerVolunteerApi } from 'src/services/api'
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
        const { access_token: token, volunteer_id } = data
        dispatch({
          type: 'LOGIN_SUCCESS',
          token,
          isVolunteer:volunteer_id!==null
        })
        let home = 'DonatorNavigator'
				if (volunteer_id) {
          home = 'VolunteerNavigator'
				}
        NavigationService.navigate(home)
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

export function register (user, isVolunteer=false) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'USER_REGISTRATION_REQUEST'
    })

    try {
      const registrationResponse = await (isVolunteer?registerVolunteerApi(user):registerDonatorApi(user))

      const { status, data } = registrationResponse.data
      if (status === 'success') {
        const { access_token: token } = data
        dispatch({
          type: 'USER_REGISTRATION_SUCCESS',
          token
        })
        let home = 'DonatorNavigator'
				if (isVolunteer) {
          home = 'VolunteerNavigator'
				}
        NavigationService.navigate(home)
      } else {
        dispatch({
          type: 'USER_REGISTRATION_FAILURE'
        })
      }
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: 'USER_REGISTRATION_FAILURE',
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
