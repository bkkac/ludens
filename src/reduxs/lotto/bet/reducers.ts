import { combineReducers } from 'redux'
import make from './make/reducers'
import result from './result/reducers'

export default combineReducers({
  make,
  result,
})