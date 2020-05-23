import { combineReducers } from 'redux'
import token from './token/reducers'
import me from './me/reducers'

export default combineReducers({
  token,
  me,
})