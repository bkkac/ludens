import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import financeAction from 'reduxs/finance/actions'
import loaderAction from 'reduxs/loader/actions'
import userAction from 'reduxs/user/actions'
import TransactionListContainer from './TransactionList.container'

const mapStateToProps = (state: RootReducers): ITransactionListProps => ({
  wallet: state.ludens.user.wallet,
  getTransactionListCode: state.ludens.finance.transaction.list.code!,
  getTransactionListError: state.ludens.finance.transaction.list.error!,
  getTransactionListIsFetching: state.ludens.finance.transaction.list.isFetching!,
  transactionList: state.ludens.finance.transaction.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ITransactionListActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  getUser: userAction.getMeAction,
  getTransactionList: financeAction.getTransactionListAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(TransactionListContainer)