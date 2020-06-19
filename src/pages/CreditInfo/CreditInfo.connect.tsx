import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import userAction from 'reduxs/user/actions'
import creditAction from 'reduxs/credit/actions'
import CreditInfoContainer from './CreditInfo.container'

const mapStateToProps = (state: RootReducers): ICreditInfoProps => ({
  wallet: state.ludens.user.wallet,
  getCreditInfoListCode: state.ludens.credit.list.code!,
  getCreditInfoListError: state.ludens.credit.list.error!,
  getCreditInfoListIsFetching: state.ludens.credit.list.isFetching!,
  creditInfo: state.ludens.credit.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ICreditInfoActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  getUser: userAction.getMeAction,
  getCreditInfoList: creditAction.getCreditInfoListAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(CreditInfoContainer)