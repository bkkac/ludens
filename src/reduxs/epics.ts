import { combineEpics } from 'redux-observable'
import lotto from './lotto/epics'
import otp from './otp/epics'
import register from './register/epics'
import loader from './loader/epics'

export default combineEpics(
  ...lotto,
  ...otp,
  ...register,
  ...loader,
)

