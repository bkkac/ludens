import { combineReducers } from 'redux'
import login from './login/reducers'
import logout from './logout/reducers'

export default combineReducers({
  login,
  logout,
})