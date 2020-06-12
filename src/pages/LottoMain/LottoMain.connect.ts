import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import LottoMainContainer from './LottoMain.container'

const mapStateToProps = (state: RootReducers): IMainLottoProps => ({
  user: state.ludens.user.me.data!,
  wallet: state.ludens.user.wallet,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IMainLottoActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProos)(LottoMainContainer)