import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import LottoListChrildrenContainer from './LottoListChrildren.container'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'

const mapStateToProps = (state: RootReducers): ILottoListChrildrenProps => ({
  getYeegeGameListIsFetching: state.ludens.lotto.yeege.gameList.isFetching!,
  getYeegeGameListError: state.ludens.lotto.yeege.gameList.error!,
  getYeegeGameListCode: state.ludens.lotto.yeege.gameList.code!,
  yeegeGameList: state.ludens.lotto.yeege.gameList.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoListChrildrenActionProps => bindActionCreators({
  getYeegeGameList: lotterAction.getYeegeGameListAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoListChrildrenContainer)