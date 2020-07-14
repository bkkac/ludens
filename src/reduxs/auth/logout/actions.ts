import { createAction } from 'typesafe-actions'
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const logoutAction = createAction(LOGOUT_REQUEST)

const logoutSuccessAction = createAction(
  LOGOUT_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse>) => resolve(data))

const logoutFailureAction = createAction(
  LOGOUT_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const logoutCancelAction = createAction(LOGOUT_CANCEL)

export default {
  logoutAction,
  logoutSuccessAction,
  logoutFailureAction,
  logoutCancelAction,
}