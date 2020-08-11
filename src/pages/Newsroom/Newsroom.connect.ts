import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import newsroomAction from 'reduxs/newsroom/actions'
import loaderAction from 'reduxs/loader/actions'
import NewsroomContainer from './Newsroom.container'

const mapStateToProps = (state: RootReducers): INewsroomProps => ({
  news: state.ludens.newsroom.data!,
  getNewsIsFetching: state.ludens.newsroom.isFetching!,
  getNewsCode: state.ludens.newsroom.code!,
  getNewsError: state.ludens.newsroom.error!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): INewsroomActionProps => bindActionCreators({
  getNews: newsroomAction.getNewsroomAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(NewsroomContainer)