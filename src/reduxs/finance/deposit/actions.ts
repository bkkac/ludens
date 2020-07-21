import { createAction } from 'typesafe-actions'
import {
  DEPOSIT_REQUEST,
  DEPOSIT_SUCCESS,
  DEPOSIT_FAILURE,
  DEPOSIT_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const depositRequestAction = createAction(
  DEPOSIT_REQUEST,
  resolve => (data: IDepositRequest) => resolve(data))

const depositRequestSuccessAction = createAction(
  DEPOSIT_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<any>>) => resolve(data))

const depositRequestFailureAction = createAction(
  DEPOSIT_FAILURE,
  resolve => (error: AxiosError<APIResponse<any>>) => resolve(error))

const depositRequestCancelAction = createAction(DEPOSIT_CANCEL)

export default {
  depositRequestAction,
  depositRequestSuccessAction,
  depositRequestFailureAction,
  depositRequestCancelAction,
}