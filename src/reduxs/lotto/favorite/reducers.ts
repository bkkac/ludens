import { combineReducers } from 'redux'
import list from './list/reducers'
import add from './add/reducers'
import edit from './edit/reducers'
import remove from './remove/reducers'

export default combineReducers({
  list,
  add,
  edit,
  remove,
})