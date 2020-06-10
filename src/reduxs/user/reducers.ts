import { combineReducers } from 'redux'
import wallet from './wallet/reducers'
import token from './token/reducers'
import me from './me/reducers'

export default combineReducers({
  wallet,
  token,
  me,
})