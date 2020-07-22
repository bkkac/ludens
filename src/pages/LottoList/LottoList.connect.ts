import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import configAction from 'reduxs/config/actions'
import LottoListContainer from './LottoList.container'

const mapStateToProps = (state: RootReducers): ILottoListProps => ({
  getLottoScheduleIsFetching: state.ludens.config.lotto.isFetching!,
  getLottoScheduleCode: state.ludens.config.lotto.code!,
  getLottoScheduleError: state.ludens.config.lotto.error!,
  lottoSchedule: state.ludens.config.lotto.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoListActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  getLottoSchedule: configAction.getLottoScheduleAction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProos)(LottoListContainer)