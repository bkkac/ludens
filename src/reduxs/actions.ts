import lottoAction from './lotto/actions'
import otpAction from './otp/actions'
import registerAction from './register/actions'
import loaderAction from './loader/actions'
import authAction from './auth/actions'
import creditAction from './credit/actions'
import userAction from './user/actions'

export default {
  ...userAction,
  ...lottoAction,
  ...otpAction,
  ...registerAction,
  ...loaderAction,
  ...authAction,
  ...creditAction,
}