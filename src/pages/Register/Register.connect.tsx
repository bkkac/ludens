import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import otpRequestAction from 'reduxs/otp/request/actions'
import otpValidateAction from 'reduxs/otp/validate/actions'
import registerAction from 'reduxs/register/actions'
import loaderAction from 'reduxs/loader/actions'
import RegisterContainer from './Register.container'

const mapStateToProps = (state: RootReducers): IRegisterProps => ({
  requestOTPIsFetching: state.ludens.otp.request.isFetching!,
  requestOTPError: state.ludens.otp.request.error!,
  requestOTPCode: state.ludens.otp.request.code!,
  otp: state.ludens.otp.request.data!,
  validateOTPIsFetching: state.ludens.otp.validate.isFetching!,
  validateOTPError: state.ludens.otp.validate.error!,
  validateOTPCode: state.ludens.otp.validate.code!,
  validateResult: state.ludens.otp.validate.data!,
  registerIsFetching: state.ludens.register.isFetching!,
  registerError: state.ludens.register.error!,
  registerCode: state.ludens.register.code!,
  registerResult: state.ludens.register.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IRegisterActionProps => bindActionCreators({
  requestOTP: otpRequestAction.getOTPAction,
  validateOTP: otpValidateAction.validateOTPAction,
  register: registerAction.registerAction,
  loading: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(RegisterContainer)