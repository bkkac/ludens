import { combineReducers } from 'redux'
import list from './list/reducers'
import yeege from './yeege/reducers'
import bet from './bet/reducers'

export default combineReducers({
  list,
  yeege,
  bet,
})