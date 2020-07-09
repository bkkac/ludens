import { combineReducers } from 'redux'
import make from './make/reducers'
import result from './result/reducers'
import rate from './rate/reducers'

export default combineReducers({
  make,
  rate,
  result,
})