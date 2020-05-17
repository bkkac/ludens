import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import creditAction from 'reduxs/credit/actions'
import loaderAction from 'reduxs/loader/actions'
import WithdrawContainer from './Withdraw.container'

const mapStateToProps = (state: RootReducers): IWithdrawProps => ({
  withdrawRequestResult: state.ludens.credit.withdraw.data,
  withdrawRequestCode: state.ludens.credit.withdraw.code!,
  withdrawRequestError: state.ludens.credit.withdraw.error!,
  withdrawRequestIsFetching: state.ludens.credit.withdraw.isFetching!,
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IWithdrawActionProps => bindActionCreators({
  withdrawRequest: creditAction.withdrawRequestAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(WithdrawContainer)