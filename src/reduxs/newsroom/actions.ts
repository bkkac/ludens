import { createAction } from 'typesafe-actions'
import {
  GET_NEWSROOM_REQUEST,
  GET_NEWSROOM_SUCCESS,
  GET_NEWSROOM_FAILURE,
  GET_NEWSROOM_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getNewsroomAction = createAction(GET_NEWSROOM_REQUEST)

const getNewsroomSuccessAction = createAction(
  GET_NEWSROOM_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ReadonlyArray<INews>>>) => resolve(data))

const getNewsroomFailureAction = createAction(
  GET_NEWSROOM_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getNewsroomCancelAction = createAction(GET_NEWSROOM_CANCEL)

export default {
  getNewsroomAction,
  getNewsroomSuccessAction,
  getNewsroomFailureAction,
  getNewsroomCancelAction,
}