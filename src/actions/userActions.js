import OneSignal from 'react-native-onesignal'
import { loginApi, logoutApi, registerDonatorApi, registerVolunteerApi } from 'src/services/api'
import { persistor } from 'src/store'
import NavigationService from 'src/services/NavigationService'

export function login (credentials) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'LOGIN_REQUEST',
      credentials
    })
    const { pushNotificationUserId } = getState().user
    console.log(pushNotificationUserId)
    try {
      const loginResponse = await loginApi({...credentials, device_id:pushNotificationUserId})

      const { status, data } = loginResponse.data
      if (status === 'success') {
        const { access_token: token, volunteer_id: volunteerId } = data
        const isVolunteer = credentials.mode === 'Relawan'
        dispatch({
          type: 'LOGIN_SUCCESS',
          token,
          isVolunteer
        })
        let home = 'DonatorNavigator'
        if (volunteerId && isVolunteer) {
          OneSignal.sendTag('volunteer', 1)
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

export function register (user, isVolunteer = false) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'USER_REGISTRATION_REQUEST'
    })

    try {
      const registrationResponse = await (isVolunteer ? registerVolunteerApi(user) : registerDonatorApi(user))

      const { status, data } = registrationResponse.data
      if (status === 'success') {
        const { access_token: token } = data
        if (isVolunteer) {
          dispatch({
            type: 'REGISTER_VOLUNTEER_SUCCESS'
          })
          NavigationService.navigate('GuestNavigator')
        } else {
          dispatch({
            type: 'REGISTER_DONATOR_SUCCESS',
            token
          })
          NavigationService.navigate('DonatorNavigator')
        }
      } else {
        dispatch({
          type: 'USER_REGISTRATION_FAILURE'
        })
      }
    } catch (error) {
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
    try {
      // attempting to revoke auth token
      const logoutResponse = await logoutApi()
      const { status } = logoutResponse.data
      if (status === 'success') {

      } else {
        // TODO : handle error!
      }
    } catch (error) {
      console.log(error)
      // TODO : handle error!
    } finally {
      const { pushNotificationUserId:userId } = getState().user
      OneSignal.deleteTag('volunteer')
      persistor.purge()
      dispatch({
        type: 'LOGOUT_SUCCESS',
        payload: userId
      })
    }
  }
}

export function setPushNotificationUserId (userId) {
  return {
    type: 'SET_PUSH_NOTIFICATION_ID',
    payload: userId
  }
}
