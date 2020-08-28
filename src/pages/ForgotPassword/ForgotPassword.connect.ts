import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import forgotPassword from 'reduxs/forgotPassword/actions'
import resetPasswordAction from 'reduxs/resetPassword/actions'
import ForgotPasswordContainer from './ForgotPassword.container'

const mapStateToProps = (state: RootReducers): IForgotPasswordProps => ({
  requestedForgotPassword: state.ludens.forgotPassword.data!,
  forgotPasswordIsFetching: state.ludens.forgotPassword.isFetching!,
  forgotPasswordCode: state.ludens.forgotPassword.code!,
  forgotPasswordError: state.ludens.forgotPassword.error!,
  resetPasswordIsFetching: state.ludens.resetPassword.isFetching!,
  resetPasswordCode: state.ludens.resetPassword.code!,
  resetPasswordError: state.ludens.resetPassword.error!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IForgotPasswordActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  forgotPasswordRequest: forgotPassword.forgotPasswordAction,
  resetPassword: resetPasswordAction.resetPasswordAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(ForgotPasswordContainer)