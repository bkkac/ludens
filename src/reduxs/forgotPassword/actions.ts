import { createAction } from 'typesafe-actions'
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const forgotPasswordAction = createAction(
  FORGOT_PASSWORD_REQUEST,
  resolve => (data: IForgotPasswordRequest) => resolve(data))

const forgotPasswordSuccessAction = createAction(
  FORGOT_PASSWORD_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IForgotPassword>>) => resolve(data))

const forgotPasswordFailureAction = createAction(
  FORGOT_PASSWORD_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const forgotPasswordCancelAction = createAction(FORGOT_PASSWORD_CANCEL)

export default {
  forgotPasswordAction,
  forgotPasswordSuccessAction,
  forgotPasswordFailureAction,
  forgotPasswordCancelAction,
}