import { combineReducers } from 'redux'
import project from 'constants/project'
import lotto from './lotto/reducers'

const rootReducers = {
  lotto,
}

export default combineReducers({ [project.name]: combineReducers(rootReducers) })