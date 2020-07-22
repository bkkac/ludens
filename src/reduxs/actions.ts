import lottoAction from './lotto/actions'
import otpAction from './otp/actions'
import registerAction from './register/actions'
import loaderAction from './loader/actions'
import authAction from './auth/actions'
import financeAction from './finance/actions'
import userAction from './user/actions'
import bankAction from './bank/actions'
import socketAction from './socket/actions'
import creditAction from './credit/actions'
import affilateAction from './affilate/actions'
import config from './config/actions'

export default {
  ...userAction,
  ...lottoAction,
  ...otpAction,
  ...registerAction,
  ...loaderAction,
  ...authAction,
  ...financeAction,
  ...bankAction,
  ...socketAction,
  ...creditAction,
  ...affilateAction,
  ...config,
}