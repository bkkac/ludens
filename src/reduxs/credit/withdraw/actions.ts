import { createAction } from 'typesafe-actions'
import {
  WITHDRAW_REQUEST,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAILURE,
  WITHDRAW_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const withdrawRequestAction = createAction(
  WITHDRAW_REQUEST,
  resolve => (data: IWithdrawRequest) => resolve(data))

const withdrawRequestSuccessAction = createAction(
  WITHDRAW_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<any>>) => resolve(data))

const withdrawRequestFailureAction = createAction(
  WITHDRAW_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const withdrawRequestCancelAction = createAction(WITHDRAW_CANCEL)

export default {
  withdrawRequestAction,
  withdrawRequestSuccessAction,
  withdrawRequestFailureAction,
  withdrawRequestCancelAction,
}