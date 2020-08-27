import { createAction } from 'typesafe-actions'
import {
  GET_YEEGE_GAME_LIST_REQUEST,
  GET_YEEGE_GAME_LIST_SUCCESS,
  GET_YEEGE_GAME_LIST_FAILURE,
  GET_YEEGE_GAME_LIST_CANCEL,
  UPDATE_YEEGE_GAME_LIST_REQUEST,
  UPDATE_YEEGE_GAME_LIST_SUCCESS,
  UPDATE_YEEGE_GAME_LIST_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getYeegeGameListAction = createAction(GET_YEEGE_GAME_LIST_REQUEST)

const getYeegeGameListSuccessAction = createAction(
  GET_YEEGE_GAME_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ILottoGame[]>>) => resolve(data))

const getYeegeGameListFailureAction = createAction(
  GET_YEEGE_GAME_LIST_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getYeegeGameListCancelAction = createAction(GET_YEEGE_GAME_LIST_CANCEL)

const updateYeegeGameListAction = createAction(
  UPDATE_YEEGE_GAME_LIST_REQUEST,
  resolve => (data: ILottoGame[]) => resolve(data))

const updateYeegeGameListSuccessAction = createAction(
  UPDATE_YEEGE_GAME_LIST_SUCCESS,
  resolve => (data: ILottoGame[]) => resolve(data))

const updateYeegeGameListFailureAction = createAction(
  UPDATE_YEEGE_GAME_LIST_FAILURE,
  resolve => (error: any) => resolve(error))

export default {
  getYeegeGameListAction,
  getYeegeGameListSuccessAction,
  getYeegeGameListFailureAction,
  getYeegeGameListCancelAction,
  updateYeegeGameListAction,
  updateYeegeGameListSuccessAction,
  updateYeegeGameListFailureAction,
}