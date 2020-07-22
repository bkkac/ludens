import { combineEpics } from 'redux-observable'
import lotto from './lotto/epics'
import otp from './otp/epics'
import register from './register/epics'
import loader from './loader/epics'
import auth from './auth/epics'
import finance from './finance/epics'
import user from './user/epics'
import bank from './bank/epics'
import socket from './socket/epics'
import credit from './credit/epics'
import affilate from './affilate/epics'
import config from './config/epics'

export default combineEpics(
  ...user,
  ...lotto,
  ...otp,
  ...register,
  ...loader,
  ...auth,
  ...finance,
  ...bank,
  ...socket,
  ...credit,
  ...affilate,
  ...config,
)

