import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoMakeContainer from './LottoMake.container'

const mapStateToProps = (state: RootReducers): IMakingLottoProps => ({
  makingBetLottoIsFetching: state.ludens.lotto.bet.isFetching!,
  makingBetLottoError: state.ludens.lotto.bet.error!,
  makingBetLottoCode: state.ludens.lotto.bet.code!,
  makingBetLottoResult: state.ludens.lotto.bet.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IMakingLottoActionProps => bindActionCreators({
  makingBetLotto: lotterAction.makingBetLottoAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoMakeContainer)