import { createAction } from 'typesafe-actions'
import {
  VALIDATE_OTP_REQUEST,
  VALIDATE_OTP_SUCCESS,
  VALIDATE_OTP_FAILURE,
  VALIDATE_OTP_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const validateOTPAction = createAction(
  VALIDATE_OTP_REQUEST,
  action => (data: { phoneNumber: string; otp: string }) => action(data))

const validateOTPSuccessAction = createAction(
  VALIDATE_OTP_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<boolean>>) => resolve(data))

const validateOTPFailureAction = createAction(
  VALIDATE_OTP_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const validateOTPCancelAction = createAction(VALIDATE_OTP_CANCEL)

export default {
  validateOTPAction,
  validateOTPSuccessAction,
  validateOTPFailureAction,
  validateOTPCancelAction,
}