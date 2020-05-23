import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import userAction from 'reduxs/user/me/actions'
import MainContainer from './Main.container'

const mapStateToProps = (state: RootReducers): IMainProps => ({
  user: state.ludens.user.me.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IMainActionProps => bindActionCreators({
  getUser: userAction.getMeAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(MainContainer)