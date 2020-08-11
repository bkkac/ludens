import { combineReducers } from 'redux'
import list from './list/reducers'
import yeege from './yeege/reducers'
import bet from './bet/reducers'
import me from './me/reducers'
import favorite from './favorite/reducers'

export default combineReducers({
  list,
  yeege,
  bet,
  me,
  favorite,
})