import { createAction } from 'typesafe-actions'
import {
  ADD_FAVORITE_LOTTO_REQUEST,
  ADD_FAVORITE_LOTTO_SUCCESS,
  ADD_FAVORITE_LOTTO_CANCEL,
  ADD_FAVORITE_LOTTO_FAILURE,
  ADD_FAVORITE_LOTTO_NUMBER_REQUEST,
  ADD_FAVORITE_LOTTO_NUMBER_SUCCESS,
  ADD_FAVORITE_LOTTO_NUMBER_CANCEL,
  ADD_FAVORITE_LOTTO_NUMBER_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const addLottoFavoriteAction = createAction(
  ADD_FAVORITE_LOTTO_REQUEST,
  resolve => (title: string) => resolve(title))

const addLottoFavoriteSuccessAction = createAction(
  ADD_FAVORITE_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const addLottoFavoriteFailureAction = createAction(
  ADD_FAVORITE_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const addLottoFavoriteCancelAction = createAction(ADD_FAVORITE_LOTTO_CANCEL)

const addLottoFavoriteNumberAction = createAction(
  ADD_FAVORITE_LOTTO_NUMBER_REQUEST,
  resolve => (data: IFavoriteNumberRequest) => resolve(data))

const addLottoFavoriteNumberSuccessAction = createAction(
  ADD_FAVORITE_LOTTO_NUMBER_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const addLottoFavoriteNumberFailureAction = createAction(
  ADD_FAVORITE_LOTTO_NUMBER_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const addLottoFavoriteNumberCancelAction = createAction(ADD_FAVORITE_LOTTO_NUMBER_CANCEL)

export default {
  addLottoFavoriteAction,
  addLottoFavoriteSuccessAction,
  addLottoFavoriteFailureAction,
  addLottoFavoriteCancelAction,
  addLottoFavoriteNumberAction,
  addLottoFavoriteNumberSuccessAction,
  addLottoFavoriteNumberFailureAction,
  addLottoFavoriteNumberCancelAction,
}