import { createAction } from 'typesafe-actions'
import {
  GET_BET_HISTORY_REQUEST,
  GET_BET_HISTORY_SUCCESS,
  GET_BET_HISTORY_FAILURE,
  GET_BET_HISTORY_CANCEL,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getBetHistoryAction = createAction(GET_BET_HISTORY_REQUEST)

const getBetHistorySuccessAction = createAction(
  GET_BET_HISTORY_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IBet[]>>) => resolve(data))

const getBetHistoryFailureAction = createAction(
  GET_BET_HISTORY_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse<any>>) => resolve(error))

const getBetHistoryCancelAction = createAction(GET_BET_HISTORY_CANCEL)

export default {
  getBetHistoryAction,
  getBetHistorySuccessAction,
  getBetHistoryFailureAction,
  getBetHistoryCancelAction,
}