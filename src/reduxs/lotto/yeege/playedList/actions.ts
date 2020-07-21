import { createAction } from 'typesafe-actions'
import {
  GET_PLAYED_YEEGE_LIST_REQUEST,
  GET_PLAYED_YEEGE_LIST_SUCCESS,
  GET_PLAYED_YEEGE_LIST_FAILURE,
  GET_PLAYED_YEEGE_LIST_CANCEL,
  LISTEN_PLAYED_YEEGE_LIST_SOCKET,
  UNLISTEN_PLAYED_YEEGE_LIST_SOCKET,
  UPDATE_PLAYED_YEEGE_LIST_REQUEST,
  UPDATE_PLAYED_YEEGE_LIST_SUCCESS,
  CLEAR_PLAYED_YEEGE_LIST,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getPlayedYeegeListAction = createAction(
  GET_PLAYED_YEEGE_LIST_REQUEST,
  resolve => (data: IGetYeegeSum) => resolve(data))

const getPlayedYeegeListSuccessAction = createAction(
  GET_PLAYED_YEEGE_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IYeegePlay[]>>) => resolve(data))

const getPlayedYeegeListFailureAction = createAction(
  GET_PLAYED_YEEGE_LIST_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getPlayedYeegeListCancelAction = createAction(GET_PLAYED_YEEGE_LIST_CANCEL)

const listenPlayedYeegeListSocket = createAction(
  LISTEN_PLAYED_YEEGE_LIST_SOCKET,
  resolve => (data: IGetYeegeSum) => resolve(data))

const unlistenPlayedYeegeListSocket = createAction(
  UNLISTEN_PLAYED_YEEGE_LIST_SOCKET,
  resolve => (data: IGetYeegeSum) => resolve(data))

const updatePlayedYeegeListAction = createAction(
  UPDATE_PLAYED_YEEGE_LIST_REQUEST,
  resolve => (data: IYeegePlay[]) => resolve(data))

const updatePlayedYeegeListSuccessAction = createAction(
  UPDATE_PLAYED_YEEGE_LIST_SUCCESS,
  resolve => (data: IYeegePlay[]) => resolve(data))

const clearPlayedYeegeList = createAction(CLEAR_PLAYED_YEEGE_LIST)

export default {
  getPlayedYeegeListAction,
  getPlayedYeegeListSuccessAction,
  getPlayedYeegeListFailureAction,
  getPlayedYeegeListCancelAction,
  listenPlayedYeegeListSocket,
  unlistenPlayedYeegeListSocket,
  updatePlayedYeegeListAction,
  updatePlayedYeegeListSuccessAction,
  clearPlayedYeegeList,
}