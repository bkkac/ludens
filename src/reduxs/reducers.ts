import { combineReducers } from 'redux'
import project from 'constants/project'
import lotto from './lotto/reducers'
import otp from './otp/reducers'
import register from './register/reducers'
import loader from './loader/reducers'
import auth from './auth/reducers'

const rootReducers = {
  lotto,
  otp,
  register,
  loader,
  auth,
}

export default combineReducers({ [project.name]: combineReducers(rootReducers) })