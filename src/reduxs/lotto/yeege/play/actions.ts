import { createAction } from 'typesafe-actions'
import {
  PLAY_YEEGE_GAME_REQUEST,
  PLAY_YEEGE_GAME_SUCCESS,
  PLAY_YEEGE_GAME_FAILURE,
  PLAY_YEEGE_GAME_CANCEL,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const playYeegeAction = createAction(
  PLAY_YEEGE_GAME_REQUEST,
  resolve => (data: IYeegePlayRequest) => resolve(data))

const playYeegeSuccessAction = createAction(
  PLAY_YEEGE_GAME_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IYeegePlay>>) => resolve(data))

const playYeegeFailureAction = createAction(
  PLAY_YEEGE_GAME_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const playYeegeCancelAction = createAction(PLAY_YEEGE_GAME_CANCEL)

export default {
  playYeegeAction,
  playYeegeSuccessAction,
  playYeegeFailureAction,
  playYeegeCancelAction,
}