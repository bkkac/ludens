import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import lotterAction from 'reduxs/lotto/actions'
import loaderAction from 'reduxs/loader/actions'
import LottoFavoriteFormContainer from './LottoFavoriteForm.container'

const mapStateToProps = (state: RootReducers): ILottoFavoriteFormProps => ({
  addLottoFavoriteIsFetching: false,
  addLottoFavoriteCode: 0,
  addLottoFavoriteError: '',
  editLottoFavoriteIsFetching: false,
  editLottoFavoriteCode: 0,
  editLottoFavoriteError: '',
})

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): ILottoFavoriteFormActionProps => bindActionCreators({
  addLottoFavorite: lotterAction.getLottoFavoriteListAction,
  editLottoFavorite: lotterAction.getLottoFavoriteListAction,
  loader: loaderAction.loadingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(LottoFavoriteFormContainer)