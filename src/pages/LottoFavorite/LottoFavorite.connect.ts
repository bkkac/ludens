import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoFavoriteContainer from './LottoFavorite.container'

const mapStateToProps = (state: RootReducers): ILottoFavoriteProps => ({
  getLottoFavoriteListIsFetching: state.ludens.lotto.favorite.list.isFetching!,
  getLottoFavoriteListCode: state.ludens.lotto.favorite.list.code!,
  getLottoFavoriteListError: state.ludens.lotto.favorite.list.error!,
  lottoFavoriteList: state.ludens.lotto.favorite.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoFavoriteActionProps => bindActionCreators({
  getLottoFavoriteList: lotterAction.getLottoFavoriteListAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoFavoriteContainer)