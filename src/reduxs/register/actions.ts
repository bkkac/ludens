import { createAction } from 'typesafe-actions'
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const registerAction = createAction(
  REGISTER_REQUEST,
  action => (data: IRegisterRequest) => action(data))

const registerSuccessAction = createAction(
  REGISTER_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<any>>) => resolve(data))

const registerFailureAction = createAction(
  REGISTER_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const registerCancelAction = createAction(REGISTER_CANCEL)

export default {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
  registerCancelAction,
}