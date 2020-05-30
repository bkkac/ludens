import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import creditAction from 'reduxs/credit/actions'
import loaderAction from 'reduxs/loader/actions'
import userAction from 'reduxs/user/actions'
import TransactionListContainer from './TransactionList.container'

const mapStateToProps = (state: RootReducers): ITransactionListProps => ({
  wallet: state.ludens.user.wallet,
  getTransactionListCode: state.ludens.credit.transaction.list.code!,
  getTransactionListError: state.ludens.credit.transaction.list.error!,
  getTransactionListIsFetching: state.ludens.credit.transaction.list.isFetching!,
  transactionList: state.ludens.credit.transaction.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ITransactionListActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  getUser: userAction.getMeAction,
  getTransactionList: creditAction.getTransactionListAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(TransactionListContainer)