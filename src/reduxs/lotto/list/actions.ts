import { createAction } from 'typesafe-actions'
import {
  GET_LOTTO_LIST_REQUEST,
  GET_LOTTO_LIST_SUCCESS,
  GET_LOTTO_LIST_FAILURE,
  GET_LOTTO_LIST_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoListAction = createAction(GET_LOTTO_LIST_REQUEST)

const getLottoListSuccessAction = createAction(
  GET_LOTTO_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ILotto[]>>) => resolve(data))

const getLottoListFailureAction = createAction(
  GET_LOTTO_LIST_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const getLottoListCancelAction = createAction(GET_LOTTO_LIST_CANCEL)

export default {
  getLottoListAction,
  getLottoListSuccessAction,
  getLottoListFailureAction,
  getLottoListCancelAction,
}