import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lottoListAction from 'reduxs/lotto/list/actions'
import HomeContainer from './Home.container'

const mapStateToProps = (state: RootReducers): IHomeProps => ({
  getLottoIsFetching: state.ludens.lotto.list.isFetching!,
  getLottoError: state.ludens.lotto.list.error!,
  getLottoCode: state.ludens.lotto.list.code!,
  lottoList: state.ludens.lotto.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IHomeActionProps => bindActionCreators({
  getLottoList: lottoListAction.getLottoListAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(HomeContainer)