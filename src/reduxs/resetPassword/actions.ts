import { createAction } from 'typesafe-actions'
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const resetPasswordAction = createAction(
  RESET_PASSWORD_REQUEST,
  resolve => (data: IResetPasswordRequest) => resolve(data))

const resetPasswordSuccessAction = createAction(
  RESET_PASSWORD_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IResetPasswordSuccess>>) => resolve(data))

const resetPasswordFailureAction = createAction(
  RESET_PASSWORD_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const resetPasswordCancelAction = createAction(RESET_PASSWORD_CANCEL)

export default {
  resetPasswordAction,
  resetPasswordSuccessAction,
  resetPasswordFailureAction,
  resetPasswordCancelAction,
}