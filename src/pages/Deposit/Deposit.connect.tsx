import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import bankAction from 'reduxs/bank/actions'
import creditAction from 'reduxs/credit/actions'
import loaderAction from 'reduxs/loader/actions'
import DepositContainer from './Deposit.container'

const mapStateToProps = (state: RootReducers): IDepositProps => ({
  bankList: state.ludens.bank.list.data!,
  getBankListCode: state.ludens.bank.list.code!,
  getBankListError: state.ludens.bank.list.error!,
  getBankListIsFetching: state.ludens.bank.list.isFetching!,
  depositRequestResult: state.ludens.credit.deposit.data,
  depositRequestCode: state.ludens.credit.deposit.code!,
  depositRequestError: state.ludens.credit.deposit.error!,
  depositRequestIsFetching: state.ludens.credit.deposit.isFetching!,
  transactionRequest: state.ludens.credit.transactionRequest.data!,
  transactionRequestCode: state.ludens.credit.transactionRequest.code!,
  transactionRequestError: state.ludens.credit.transactionRequest.error!,
  transactionRequestIsFetching: state.ludens.credit.transactionRequest.isFetching!,
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IDepositActionProps => bindActionCreators({
  getBankList: bankAction.getBankListAction,
  depositRequest: creditAction.depositRequestAction,
  loader: loaderAction.loadingAction,
  getTransactionRequest: creditAction.getTransactionRequestAction,
  signTransactionRequest: creditAction.signTransactionRequestAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(DepositContainer)