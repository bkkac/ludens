import { createAction } from 'typesafe-actions'
import {
  GET_FAVORITE_LOTTO_REQUEST,
  GET_FAVORITE_LOTTO_SUCCESS,
  GET_FAVORITE_LOTTO_CANCEL,
  GET_FAVORITE_LOTTO_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoFavoriteAction = createAction(
  GET_FAVORITE_LOTTO_REQUEST,
  resolve => (id: number) => resolve(id))

const getLottoFavoriteSuccessAction = createAction(
  GET_FAVORITE_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const getLottoFavoriteFailureAction = createAction(
  GET_FAVORITE_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoFavoriteCancelAction = createAction(GET_FAVORITE_LOTTO_CANCEL)

export default {
  getLottoFavoriteAction,
  getLottoFavoriteSuccessAction,
  getLottoFavoriteFailureAction,
  getLottoFavoriteCancelAction,
}