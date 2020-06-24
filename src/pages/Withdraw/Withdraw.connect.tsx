import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import financeAction from 'reduxs/finance/actions'
import loaderAction from 'reduxs/loader/actions'
import WithdrawContainer from './Withdraw.container'

const mapStateToProps = (state: RootReducers): IWithdrawProps => ({
  withdrawRequestResult: state.ludens.finance.withdraw.data,
  withdrawRequestCode: state.ludens.finance.withdraw.code!,
  withdrawRequestError: state.ludens.finance.withdraw.error!,
  withdrawRequestIsFetching: state.ludens.finance.withdraw.isFetching!,
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IWithdrawActionProps => bindActionCreators({
  withdrawRequest: financeAction.withdrawRequestAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(WithdrawContainer)