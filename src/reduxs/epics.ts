import { combineEpics } from 'redux-observable'
import lotto from './lotto/epics'
import otp from './otp/epics'
import register from './register/epics'
import loader from './loader/epics'
import auth from './auth/epics'
import credit from './credit/epics'
import user from './user/epics'

export default combineEpics(
  ...user,
  ...lotto,
  ...otp,
  ...register,
  ...loader,
  ...auth,
  ...credit,
)

