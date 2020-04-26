import lottoAction from './lotto/actions'
import otpAction from './otp/actions'
import registerAction from './register/actions'
import loaderAction from './loader/actions'
import authAction from './auth/actions'

export default {
  ...lottoAction,
  ...otpAction,
  ...registerAction,
  ...loaderAction,
  ...authAction,
}