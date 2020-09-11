import { createAction } from 'typesafe-actions'
import {
  REMOVE_FAVORITE_LOTTO_REQUEST,
  REMOVE_FAVORITE_LOTTO_SUCCESS,
  REMOVE_FAVORITE_LOTTO_CANCEL,
  REMOVE_FAVORITE_LOTTO_FAILURE,
  REMOVE_FAVORITE_LOTTO_NUMBER_REQUEST,
  REMOVE_FAVORITE_LOTTO_NUMBER_SUCCESS,
  REMOVE_FAVORITE_LOTTO_NUMBER_CANCEL,
  REMOVE_FAVORITE_LOTTO_NUMBER_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const removeLottoFavoriteAction = createAction(
  REMOVE_FAVORITE_LOTTO_REQUEST,
  resolve => (id: number) => resolve(id))

const removeLottoFavoriteSuccessAction = createAction(
  REMOVE_FAVORITE_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const removeLottoFavoriteFailureAction = createAction(
  REMOVE_FAVORITE_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const removeLottoFavoriteCancelAction = createAction(REMOVE_FAVORITE_LOTTO_CANCEL)

const removeLottoFavoriteNumberAction = createAction(
  REMOVE_FAVORITE_LOTTO_NUMBER_REQUEST,
  resolve => (id: number) => resolve(id))

const removeLottoFavoriteNumberSuccessAction = createAction(
  REMOVE_FAVORITE_LOTTO_NUMBER_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const removeLottoFavoriteNumberFailureAction = createAction(
  REMOVE_FAVORITE_LOTTO_NUMBER_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const removeLottoFavoriteNumberCancelAction = createAction(REMOVE_FAVORITE_LOTTO_NUMBER_CANCEL)

export default {
  removeLottoFavoriteAction,
  removeLottoFavoriteSuccessAction,
  removeLottoFavoriteFailureAction,
  removeLottoFavoriteCancelAction,
  removeLottoFavoriteNumberAction,
  removeLottoFavoriteNumberSuccessAction,
  removeLottoFavoriteNumberFailureAction,
  removeLottoFavoriteNumberCancelAction,
}