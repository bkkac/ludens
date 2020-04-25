import { createAction } from 'typesafe-actions'
import {
  GET_OTP_REQUEST,
  GET_OTP_SUCCESS,
  GET_OTP_FAILURE,
  GET_OTP_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getOTPAction = createAction(
  GET_OTP_REQUEST,
  action => (mobileNumber: string) => action(mobileNumber))

const getOTPSuccessAction = createAction(
  GET_OTP_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IOTP>>) => resolve(data))

const getOTPFailureAction = createAction(
  GET_OTP_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const getOTPCancelAction = createAction(GET_OTP_CANCEL)

export default {
  getOTPAction,
  getOTPSuccessAction,
  getOTPFailureAction,
  getOTPCancelAction,
}