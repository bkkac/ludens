import { createAction } from 'typesafe-actions'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const loginAction = createAction(
  LOGIN_REQUEST,
  resolve => (data: ILoginRequest) => resolve(data))

const loginSuccessAction = createAction(
  LOGIN_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<{ token: string }>>) => resolve(data))

const loginFailureAction = createAction(
  LOGIN_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const loginCancelAction = createAction(LOGIN_CANCEL)

export default {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
  loginCancelAction,
}