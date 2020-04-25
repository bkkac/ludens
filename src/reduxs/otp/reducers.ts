import { combineReducers } from 'redux'
import request from './request/reducers'
import validate from './validate/reducers'

export default combineReducers({
  request,
  validate,
})