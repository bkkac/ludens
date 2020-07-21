import { createAction } from 'typesafe-actions'
import {
  GET_BET_RESULT_REQUEST,
  GET_BET_RESULT_SUCCESS,
  GET_BET_RESULT_FAILURE,
  GET_BET_RESULT_CANCEL,
  CLEAR_BET_RESULT,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getBetResultAction = createAction(
  GET_BET_RESULT_REQUEST,
  resolve => (data: IBetResultRequest) => resolve(data))

const getBetResultSuccessAction = createAction(
  GET_BET_RESULT_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IBetResult[]>>) => resolve(data))

const getBetResultFailureAction = createAction(
  GET_BET_RESULT_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getBetResultCancelAction = createAction(GET_BET_RESULT_CANCEL)

const clearBetResultAction = createAction(CLEAR_BET_RESULT)

export default {
  getBetResultAction,
  getBetResultSuccessAction,
  getBetResultFailureAction,
  getBetResultCancelAction,
  clearBetResultAction,
}