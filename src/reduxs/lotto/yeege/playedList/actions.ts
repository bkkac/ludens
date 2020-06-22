import { createAction } from 'typesafe-actions'
import {
  GET_PLAYED_YEEGE_LIST_REQUEST,
  GET_PLAYED_YEEGE_LIST_SUCCESS,
  GET_PLAYED_YEEGE_LIST_FAILURE,
  GET_PLAYED_YEEGE_LIST_CANCEL,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getPlayedYeegeListAction = createAction(
  GET_PLAYED_YEEGE_LIST_REQUEST,
  resolve => (data: IGetYeegeSum) => resolve(data))

const getPlayedYeegeListSuccessAction = createAction(
  GET_PLAYED_YEEGE_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IYeegePlay[]>>) => resolve(data))

const getPlayedYeegeListFailureAction = createAction(
  GET_PLAYED_YEEGE_LIST_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const getPlayedYeegeListCancelAction = createAction(GET_PLAYED_YEEGE_LIST_CANCEL)

export default {
  getPlayedYeegeListAction,
  getPlayedYeegeListSuccessAction,
  getPlayedYeegeListFailureAction,
  getPlayedYeegeListCancelAction,
}