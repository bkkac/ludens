import { createAction } from 'typesafe-actions'
import {
  GET_LOTTO_REQUEST,
  GET_LOTTO_SUCCESS,
  GET_LOTTO_FAILURE,
  GET_LOTTO_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoAction = createAction(
  GET_LOTTO_REQUEST,
  resolve => (slugname: TLottoSlug, date: string, round: string) => resolve({ slugname, date, round }))

const getLottoSuccessAction = createAction(
  GET_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ILottoGame>>) => resolve(data))

const getLottoFailureAction = createAction(
  GET_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoCancelAction = createAction(GET_LOTTO_CANCEL)

export default {
  getLottoAction,
  getLottoSuccessAction,
  getLottoFailureAction,
  getLottoCancelAction,
}