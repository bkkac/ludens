import { combineReducers } from 'redux'
import { getLottoListReducer } from './getLottoList'

export default combineReducers({
  lottoList: getLottoListReducer,
})
