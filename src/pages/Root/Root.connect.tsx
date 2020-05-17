import { connect } from 'react-redux'
import RootContainer from './Root.container'
import { RootAction } from 'typings/reduxs/Actions'
import { bindActionCreators, Dispatch } from 'redux'
import loaderAction from 'reduxs/loader/actions'


const mapStateToProps = (state: RootReducers): IRootProps => ({
  accessToken: state.ludens.user.token.accessToken!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IRootActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
}, dispatch)

  export default connect(mapStateToProps, mapDispatchToProos)(RootContainer)