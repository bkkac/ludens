import { combineReducers } from 'redux'
import deposit from './deposit/reducers'
import withdraw from './withdraw/reducers'
import transaction from './transaction/reducers'

export default combineReducers({
  deposit,
  withdraw,
  transaction,
})