import { createAction } from 'typesafe-actions'
import {
  GET_BET_RATE_REQUEST,
  GET_BET_RATE_SUCCESS,
  GET_BET_RATE_FAILURE,
  GET_BET_RATE_CANCEL,
  CLEAR_BET_RATE,
  GET_BET_NUMBER_RATE_REQUEST,
  GET_BET_NUMBER_RATE_SUCCESS,
  GET_BET_NUMBER_RATE_FAILURE,
  GET_BET_NUMBER_RATE_CANCEL,
  CLEAR_BET_NUMBER_RATE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getBetRateAction = createAction(GET_BET_RATE_REQUEST)

const getBetRateSuccessAction = createAction(
  GET_BET_RATE_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IBetRate[]>>) => resolve(data))

const getBetRateFailureAction = createAction(
  GET_BET_RATE_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getBetRateCancelAction = createAction(GET_BET_RATE_CANCEL)

const clearBetRateAction = createAction(CLEAR_BET_RATE)

const getBetNumberRateAction = createAction(
  GET_BET_NUMBER_RATE_REQUEST,
  resolve => (data: IBetNumberRateRequest[]) => resolve(data))

const getBetNumberRateSuccessAction = createAction(
  GET_BET_NUMBER_RATE_SUCCESS,
  resolve => (data: (IBetNumberRateRequest & { rate: string })[]) => resolve(data))

const getBetNumberRateFailureAction = createAction(
  GET_BET_NUMBER_RATE_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getBetNumberRateCancelAction = createAction(GET_BET_NUMBER_RATE_CANCEL)

const clearBetNumberRateAction = createAction(CLEAR_BET_NUMBER_RATE)

export default {
  getBetRateAction,
  getBetRateSuccessAction,
  getBetRateFailureAction,
  getBetRateCancelAction,
  clearBetRateAction,
  getBetNumberRateAction,
  getBetNumberRateSuccessAction,
  getBetNumberRateFailureAction,
  getBetNumberRateCancelAction,
  clearBetNumberRateAction,
}