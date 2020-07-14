import { createAction } from 'typesafe-actions'
import {
  GET_BET_RATE_REQUEST,
  GET_BET_RATE_SUCCESS,
  GET_BET_RATE_FAILURE,
  GET_BET_RATE_CANCEL,
  CLEAR_BET_RATE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getBetRateAction = createAction(GET_BET_RATE_REQUEST)

const getBetRateSuccessAction = createAction(
  GET_BET_RATE_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IBetRate[]>>) => resolve(data))

const getBetRateFailureAction = createAction(
  GET_BET_RATE_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const getBetRateCancelAction = createAction(GET_BET_RATE_CANCEL)

const clearBetRateAction = createAction(CLEAR_BET_RATE)

export default {
  getBetRateAction,
  getBetRateSuccessAction,
  getBetRateFailureAction,
  getBetRateCancelAction,
  clearBetRateAction,
}