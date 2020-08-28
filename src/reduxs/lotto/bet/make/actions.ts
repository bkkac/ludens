import { createAction } from 'typesafe-actions'
import {
  MAKING_BET_LOTTO_REQUEST,
  MAKING_BET_LOTTO_SUCCESS,
  MAKING_BET_LOTTO_FAILURE,
  MAKING_BET_LOTTO_CANCEL,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const makingBetLottoAction = createAction(
  MAKING_BET_LOTTO_REQUEST,
  resolve => (data: ILottoNumber[]) => resolve(data))

const makingBetLottoSuccessAction = createAction(
  MAKING_BET_LOTTO_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IBet[]>>) => resolve(data))

const makingBetLottoFailureAction = createAction(
  MAKING_BET_LOTTO_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const makingBetLottoCancelAction = createAction(MAKING_BET_LOTTO_CANCEL)

export default {
  makingBetLottoAction,
  makingBetLottoSuccessAction,
  makingBetLottoFailureAction,
  makingBetLottoCancelAction,
}