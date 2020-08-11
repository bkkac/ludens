import { createAction } from 'typesafe-actions'
import {
  GET_FAVORITE_LOTTO_REQUEST,
  GET_FAVORITE_LOTTO_SUCCESS,
  GET_FAVORITE_LOTTO_CANCEL,
  GET_FAVORITE_LOTTO_FAILURE,
  CLEAR_FAVORITE_LOTTO,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoFavoriteListAction = createAction(GET_FAVORITE_LOTTO_REQUEST)

const getLottoFavoriteListSuccessAction = createAction(
  GET_FAVORITE_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ReadonlyArray<IFavoriteSet>>>) => resolve(data))

const getLottoFavoriteListFailureAction = createAction(
  GET_FAVORITE_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoFavoriteListCancelAction = createAction(GET_FAVORITE_LOTTO_CANCEL)

const clearLottoFavoriteListAction = createAction(CLEAR_FAVORITE_LOTTO)

export default {
  getLottoFavoriteListAction,
  getLottoFavoriteListSuccessAction,
  getLottoFavoriteListFailureAction,
  getLottoFavoriteListCancelAction,
  clearLottoFavoriteListAction,
}