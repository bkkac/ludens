import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoPaymentContainer from './LottoPayment.container'

const mapStateToProps = (state: RootReducers): ILottoPaymentProps => ({
  makingBetLottoIsFetching: state.ludens.lotto.bet.make.isFetching!,
  makingBetLottoError: state.ludens.lotto.bet.make.error!,
  makingBetLottoCode: state.ludens.lotto.bet.make.code!,
  makingBetLottoResult: state.ludens.lotto.bet.make.data!,
  betRates: state.ludens.lotto.bet.rate.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoPaymentActionProps => bindActionCreators({
  getBetRate: lotterAction.getBetRateAction,
  makingBetLotto: lotterAction.makingBetLottoAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoPaymentContainer)