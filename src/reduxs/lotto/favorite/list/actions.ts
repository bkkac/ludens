import { createAction } from 'typesafe-actions'
import {
  GET_FAVORITE_LOTTO_LIST_REQUEST,
  GET_FAVORITE_LOTTO_LIST_SUCCESS,
  GET_FAVORITE_LOTTO_LIST_CANCEL,
  GET_FAVORITE_LOTTO_LIST_FAILURE,
  CLEAR_FAVORITE_LOTTO_LIST,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoFavoriteListAction = createAction(GET_FAVORITE_LOTTO_LIST_REQUEST)

const getLottoFavoriteListSuccessAction = createAction(
  GET_FAVORITE_LOTTO_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ReadonlyArray<IFavoriteSet>>>) => resolve(data))

const getLottoFavoriteListFailureAction = createAction(
  GET_FAVORITE_LOTTO_LIST_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoFavoriteListCancelAction = createAction(GET_FAVORITE_LOTTO_LIST_CANCEL)

const clearLottoFavoriteListAction = createAction(CLEAR_FAVORITE_LOTTO_LIST)

export default {
  getLottoFavoriteListAction,
  getLottoFavoriteListSuccessAction,
  getLottoFavoriteListFailureAction,
  getLottoFavoriteListCancelAction,
  clearLottoFavoriteListAction,
}