import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lottoListAction from 'reduxs/lotto/list/actions'
import authAction from 'reduxs/auth/actions'
import HomeContainer from './Home.container'

const mapStateToProps = (state: RootReducers): IHomeProps => ({
  getLottoIsFetching: state.ludens.lotto.list.isFetching!,
  getLottoError: state.ludens.lotto.list.error!,
  getLottoCode: state.ludens.lotto.list.code!,
  lottoList: state.ludens.lotto.list.data!,
  loginIsFetching: state.ludens.auth.login.isFetching!,
  loginError: state.ludens.auth.login.error!,
  loginCode: state.ludens.auth.login.code!,
  loginResult: state.ludens.auth.login.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IHomeActionProps => bindActionCreators({
  getLottoList: lottoListAction.getLottoListAction,
  login: authAction.loginAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(HomeContainer)