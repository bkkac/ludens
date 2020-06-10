import { combineReducers } from 'redux'
import list from './list/reducers'
import yeege from './yeege/reducers'

export default combineReducers({
  list,
  yeege,
})