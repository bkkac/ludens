import { combineReducers } from 'redux'
import summary from './summary/reducers'
import member from './member/reducers'

export default combineReducers({
  summary,
  member,
})