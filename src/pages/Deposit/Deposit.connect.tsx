import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import bankAction from 'reduxs/bank/actions'
import financeAction from 'reduxs/finance/actions'
import loaderAction from 'reduxs/loader/actions'
import DepositContainer from './Deposit.container'

const mapStateToProps = (state: RootReducers): IDepositProps => ({
  bankList: state.ludens.bank.list.data!,
  getBankListCode: state.ludens.bank.list.code!,
  getBankListError: state.ludens.bank.list.error!,
  getBankListIsFetching: state.ludens.bank.list.isFetching!,
  depositRequestResult: state.ludens.finance.deposit.data,
  depositRequestCode: state.ludens.finance.deposit.code!,
  depositRequestError: state.ludens.finance.deposit.error!,
  depositRequestIsFetching: state.ludens.finance.deposit.isFetching!,
  transactionRequest: state.ludens.finance.transactionRequest.data!,
  transactionRequestCode: state.ludens.finance.transactionRequest.code!,
  transactionRequestError: state.ludens.finance.transactionRequest.error!,
  transactionRequestIsFetching: state.ludens.finance.transactionRequest.isFetching!,
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IDepositActionProps => bindActionCreators({
  getBankList: bankAction.getBankListAction,
  depositRequest: financeAction.depositRequestAction,
  loader: loaderAction.loadingAction,
  getTransactionRequest: financeAction.getTransactionRequestAction,
  signTransactionRequest: financeAction.signTransactionRequestAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(DepositContainer)