import { connect } from 'react-redux'
import { get } from 'lodash'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import bankAction from 'reduxs/bank/actions'
import financeAction from 'reduxs/finance/actions'
import { initialState } from 'reduxs/finance/transactionRequest/constants'
import loaderAction from 'reduxs/loader/actions'
import DepositContainer from './Deposit.container'

const transactionRequest = (state: RootReducers): ITransactionRequestState => get(state, 'ludens.finance.transactionRequest', initialState)
const transactionRequestRequest = (state: RootReducers): ReducerState<ITransactionRequest> =>
  get(transactionRequest(state), 'request', initialState.request)
const transactionRequestCancel = (state: RootReducers): ReducerState<ITransactionRequest> =>
  get(transactionRequest(state), 'cancel', initialState.cancel)

const mapStateToProps = (state: RootReducers): IDepositProps => ({
  bankList: state.ludens.bank.list.data!,
  getBankListCode: state.ludens.bank.list.code!,
  getBankListError: state.ludens.bank.list.error!,
  getBankListIsFetching: state.ludens.bank.list.isFetching!,
  depositRequestResult: state.ludens.finance.deposit.data,
  depositRequestCode: state.ludens.finance.deposit.code!,
  depositRequestError: state.ludens.finance.deposit.error!,
  depositRequestIsFetching: state.ludens.finance.deposit.isFetching!,
  transactionRequest: transactionRequestRequest(state).data!,
  transactionRequestCode: transactionRequestRequest(state).code!,
  transactionRequestError: transactionRequestRequest(state).error!,
  transactionRequestIsFetching: transactionRequestRequest(state).isFetching!,
  transactionCancel: transactionRequestCancel(state).data!,
  transactionCancelCode: transactionRequestCancel(state).code!,
  transactionCancelError: transactionRequestCancel(state).error!,
  transactionCancelIsFetching: transactionRequestCancel(state).isFetching!,
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IDepositActionProps => bindActionCreators({
  getBankList: bankAction.getBankListAction,
  depositRequest: financeAction.depositRequestAction,
  loader: loaderAction.loadingAction,
  getTransactionRequest: financeAction.getTransactionRequestAction,
  signTransactionRequest: financeAction.signTransactionRequestAction,
  cancelingTransactionRequest: financeAction.cancelingTransactionRequestAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(DepositContainer)