import { combineReducers } from 'redux'
import lotto from './lotto/reducers'
import me from './me/reducers'

export default combineReducers({
  lotto,
  me,
})