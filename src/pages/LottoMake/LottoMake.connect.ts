import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoMakeContainer from './LottoMake.container'

const mapStateToProps = (state: RootReducers): IMakingLottoProps => ({
  makingBetLottoIsFetching: state.ludens.lotto.bet.make.isFetching!,
  makingBetLottoError: state.ludens.lotto.bet.make.error!,
  makingBetLottoCode: state.ludens.lotto.bet.make.code!,
  makingBetLottoResult: state.ludens.lotto.bet.make.data!,
  playYeegeIsFetching: state.ludens.lotto.yeege.play.isFetching!,
  playYeegeError: state.ludens.lotto.yeege.play.error!,
  playYeegeCode: state.ludens.lotto.yeege.play.code!,
  playYeegeResult: state.ludens.lotto.yeege.play.data!,
  getYeegeSumIsFetching: state.ludens.lotto.yeege.sum.isFetching!,
  getYeegeSumError: state.ludens.lotto.yeege.sum.error!,
  getYeegeSumCode: state.ludens.lotto.yeege.sum.code!,
  yeegeSum: state.ludens.lotto.yeege.sum.data!,
  getPlayedYeegeListIsFetching: state.ludens.lotto.yeege.playedList.isFetching!,
  getPlayedYeegeListError: state.ludens.lotto.yeege.playedList.error!,
  getPlayedYeegeListCode: state.ludens.lotto.yeege.playedList.code!,
  playedYeegeList: state.ludens.lotto.yeege.playedList.data!,
  getBetResultIsFetching: state.ludens.lotto.bet.result.isFetching!,
  getBetResultError: state.ludens.lotto.bet.result.error!,
  getBetResultCode: state.ludens.lotto.bet.result.code!,
  betResults: state.ludens.lotto.bet.result.data!,
  betRates: state.ludens.lotto.bet.rate.data!,
  getLottoGameIsFetching: state.ludens.lotto.game.isFetching!,
  getLottoGameCode: state.ludens.lotto.game.code!,
  getLottoGameError: state.ludens.lotto.game.error!,
  lottoGame: state.ludens.lotto.game.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IMakingLottoActionProps => bindActionCreators({
  getLottoGame: lotterAction.getLottoAction,
  getBetRate: lotterAction.getBetRateAction,
  getPlayedYeegeList: lotterAction.getPlayedYeegeListAction,
  listenPlayedYeegeList: lotterAction.listenPlayedYeegeListSocket,
  unlistenPlayedYeegeList: lotterAction.unlistenPlayedYeegeListSocket,
  makingBetLotto: lotterAction.makingBetLottoAction,
  getYeegeSum: lotterAction.getYeegeSumAction,
  listenYeegeSum: lotterAction.listenYeegeSumSocket,
  unlistenYeegeSum: lotterAction.unlistenYeegeSumSocket,
  getBetResult: lotterAction.getBetResultAction,
  playYeege: lotterAction.playYeegeAction,
  loader: loaderAction.loadingAction,
  clearBetResult: lotterAction.clearBetResultAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoMakeContainer)