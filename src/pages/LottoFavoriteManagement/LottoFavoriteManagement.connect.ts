import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoFavoriteManagementContainer from './LottoFavoriteManagement.container'

const mapStateToProps = (state: RootReducers): ILottoFavoriteManagementProps => ({
  getLottoFavoriteListIsFetching: state.ludens.lotto.favorite.list.isFetching!,
  getLottoFavoriteListCode: state.ludens.lotto.favorite.list.code!,
  getLottoFavoriteListError: state.ludens.lotto.favorite.list.error!,
  lottoFavoriteList: state.ludens.lotto.favorite.list.data!,
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoFavoriteManagementActionProps => bindActionCreators({
  getLottoFavoriteList: lotterAction.getLottoFavoriteListAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoFavoriteManagementContainer)