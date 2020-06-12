import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import LottoSubContainer from './LottoSub.container'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'

const mapStateToProps = (state: RootReducers): ISubLottoProps => ({
  getYeegeGameListIsFetching: state.ludens.lotto.yeege.game.isFetching!,
  getYeegeGameListError: state.ludens.lotto.yeege.game.error!,
  getYeegeGameListCode: state.ludens.lotto.yeege.game.code!,
  yeegeGameList: state.ludens.lotto.yeege.game.data!,
  user: state.ludens.user.me.data!,
  wallet: state.ludens.user.wallet,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ISubLottoActionProps => bindActionCreators({
  getYeegeGameList: lotterAction.getYeegeGameListAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoSubContainer)