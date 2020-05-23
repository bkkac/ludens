import { createAction } from 'typesafe-actions'
import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  GET_ME_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getMeAction = createAction(GET_ME_REQUEST)

const getMeSuccessAction = createAction(
  GET_ME_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IUser>>) => resolve(data))

const getMeFailureAction = createAction(
  GET_ME_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const getMeCancelAction = createAction(GET_ME_CANCEL)

export default {
  getMeAction,
  getMeSuccessAction,
  getMeFailureAction,
  getMeCancelAction,
}