import { connect } from 'react-redux'
import RootContainer from './Root.container'

const mapStateToProps = (state: RootReducers): IRootProps => ({
  accessToken: state.ludens.user.accessToken!,
})

export default connect(mapStateToProps, null)(RootContainer)