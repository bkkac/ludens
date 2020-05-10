import { combineReducers } from 'redux'
import deposit from './deposit/reducers'
import withdraw from './withdraw/reducers'

export default combineReducers({
  deposit,
  withdraw,
})