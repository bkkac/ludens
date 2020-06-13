import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import LottoMainContainer from './LottoMain.container'

const mapStateToProps = (state: RootReducers): IMainLottoProps => ({
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IMainLottoActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProos)(LottoMainContainer)