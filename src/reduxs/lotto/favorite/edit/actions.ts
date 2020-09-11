import { createAction } from 'typesafe-actions'
import {
  EDIT_FAVORITE_LOTTO_REQUEST,
  EDIT_FAVORITE_LOTTO_SUCCESS,
  EDIT_FAVORITE_LOTTO_CANCEL,
  EDIT_FAVORITE_LOTTO_FAILURE,
  EDIT_FAVORITE_LOTTO_NUMBER_REQUEST,
  EDIT_FAVORITE_LOTTO_NUMBER_SUCCESS,
  EDIT_FAVORITE_LOTTO_NUMBER_CANCEL,
  EDIT_FAVORITE_LOTTO_NUMBER_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const editLottoFavoriteAction = createAction(
  EDIT_FAVORITE_LOTTO_REQUEST,
  resolve => (id: number, title: string) => resolve({ id, title }))

const editLottoFavoriteSuccessAction = createAction(
  EDIT_FAVORITE_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const editLottoFavoriteFailureAction = createAction(
  EDIT_FAVORITE_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const editLottoFavoriteCancelAction = createAction(EDIT_FAVORITE_LOTTO_CANCEL)

const editLottoFavoriteNumberAction = createAction(
  EDIT_FAVORITE_LOTTO_NUMBER_REQUEST,
  resolve => (data: IFavoriteNumberRequest) => resolve(data))

const editLottoFavoriteNumberSuccessAction = createAction(
  EDIT_FAVORITE_LOTTO_NUMBER_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IFavoriteSet>>) => resolve(data))

const editLottoFavoriteNumberFailureAction = createAction(
  EDIT_FAVORITE_LOTTO_NUMBER_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const editLottoFavoriteNumberCancelAction = createAction(EDIT_FAVORITE_LOTTO_NUMBER_CANCEL)

export default {
  editLottoFavoriteAction,
  editLottoFavoriteSuccessAction,
  editLottoFavoriteFailureAction,
  editLottoFavoriteCancelAction,
  editLottoFavoriteNumberAction,
  editLottoFavoriteNumberSuccessAction,
  editLottoFavoriteNumberFailureAction,
  editLottoFavoriteNumberCancelAction,
}