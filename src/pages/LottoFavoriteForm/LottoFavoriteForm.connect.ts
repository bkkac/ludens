import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import favoriteSelector from 'reduxs/lotto/favorite/selectors'
import LottoFavoriteFormContainer from './LottoFavoriteForm.container'

const mapStateToProps = (state: RootReducers): ILottoFavoriteFormProps => {
  const getFavoriteLotto = favoriteSelector.getFavoriteNumber(state)
  const favoriteAddNumber = favoriteSelector.favoriteAddNumber(state)
  const favoriteAddSet = favoriteSelector.favoriteAddSet(state)
  const favoriteEditNumber = favoriteSelector.favoriteEditNumber(state)
  const favoriteEditSet = favoriteSelector.favoriteEditSet(state)
  const favoriteRemoveNumber = favoriteSelector.favoriteRemoveNumber(state)
  const favoriteRemoveSet = favoriteSelector.favoriteRemoveSet(state)

  return ({
    getLottoFavoriteIsFetching: getFavoriteLotto.isFetching!,
    getLottoFavoriteCode: getFavoriteLotto.code!,
    getLottoFavoriteError: getFavoriteLotto.error!,
    favoriteLotto: getFavoriteLotto.data!,
    addLottoFavoriteTitleIsFetching: favoriteAddSet.isFetching!,
    addLottoFavoriteTitleCode: favoriteAddSet.code!,
    addLottoFavoriteTitleError: favoriteAddSet.error!,
    addLottoFavoriteTitleResponse: favoriteAddSet.data!,
    editLottoFavoriteTitleIsFetching: favoriteEditSet.isFetching!,
    editLottoFavoriteTitleCode: favoriteEditSet.code!,
    editLottoFavoriteTitleError: favoriteEditSet.error!,
    removeLottoFavoriteTitleIsFetching: favoriteRemoveSet.isFetching!,
    removeLottoFavoriteTitleCode: favoriteRemoveSet.code!,
    removeLottoFavoriteTitleError: favoriteRemoveSet.error!,
    addLottoFavoriteNumberIsFetching: favoriteAddNumber.isFetching!,
    addLottoFavoriteNumberCode: favoriteAddNumber.code!,
    addLottoFavoriteNumberError: favoriteAddNumber.error!,
    editLottoFavoriteNumberIsFetching: favoriteEditNumber.isFetching!,
    editLottoFavoriteNumberCode: favoriteEditNumber.code!,
    editLottoFavoriteNumberError: favoriteEditNumber.error!,
    removeLottoFavoriteNumberIsFetching: favoriteRemoveNumber.isFetching!,
    removeLottoFavoriteNumberCode: favoriteRemoveNumber.code!,
    removeLottoFavoriteNumberError: favoriteRemoveNumber.error!,
  })
}

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoFavoriteFormActionProps => bindActionCreators({
  loader: loaderAction.loadingAction,
  getLottoFavorite: lotterAction.getLottoFavoriteAction,
  addLottoFavoriteTitle: lotterAction.addLottoFavoriteAction,
  addLottoFavoriteNumber: lotterAction.addLottoFavoriteNumberAction,
  editLottoFavoriteTitle: lotterAction.editLottoFavoriteAction,
  editLottoFavoriteNumber: lotterAction.editLottoFavoriteNumberAction,
  removeLottoFavoriteTitle: lotterAction.removeLottoFavoriteAction,
  removeLottoFavoriteNumber: lotterAction.removeLottoFavoriteNumberAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoFavoriteFormContainer)