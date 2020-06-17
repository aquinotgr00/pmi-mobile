import { combineReducers } from 'redux'
import user from './userReducers'
import chat from './chatReducers'

export default combineReducers({
  user,
  chat
})
