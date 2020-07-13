import { connect } from 'react-redux'
import RootContainer from './Root.container'
import { RootAction } from 'typings/reduxs/Actions'
import { bindActionCreators, Dispatch } from 'redux'
import loaderAction from 'reduxs/loader/actions'
import socketAction from 'reduxs/socket/actions'
import authAction from 'reduxs/auth/actions'


const mapStateToProps = (state: RootReducers): IRootProps => ({
  accessToken: state.ludens.user.token.accessToken!,
  wallet: state.ludens.user.wallet,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IRootActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  logout: authAction.logoutAction,
  connectSocket: socketAction.connectSocketAction,
}, dispatch)

  export default connect(mapStateToProps, mapDispatchToProos)(RootContainer)