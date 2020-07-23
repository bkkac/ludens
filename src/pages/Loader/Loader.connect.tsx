import { connect } from 'react-redux'
import LoaderContainer from './Loader.container'

const mapStateToProps = (state: RootReducers): ILoaderProps => ({
  isLoading: state.ludens.loader,
})

export default connect(mapStateToProps, {})(LoaderContainer)