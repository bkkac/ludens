import { createAction } from 'typesafe-actions'
import {
  GET_LOTTO_GAME_REQUEST,
  GET_LOTTO_GAME_SUCCESS,
  GET_LOTTO_GAME_FAILURE,
  GET_LOTTO_GAME_CANCEL,
  UPDATE_LOTTO_GAME_REQUEST,
  UPDATE_LOTTO_GAME_SUCCESS,
  UPDATE_LOTTO_GAME_FAILURE,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoGameAction = createAction(
  GET_LOTTO_GAME_REQUEST,
  resolve => (qurey: ILottoRoundQuery) => resolve(qurey))

const getLottoGameSuccessAction = createAction(
  GET_LOTTO_GAME_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ILottoGame>>) => resolve(data))

const getLottoGameFailureAction = createAction(
  GET_LOTTO_GAME_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoGameCancelAction = createAction(GET_LOTTO_GAME_CANCEL)

const updateLottoGameAction = createAction(
  UPDATE_LOTTO_GAME_REQUEST,
  resolve => (data: ILottoGame) => resolve(data))

const updateLottoGameSuccessAction = createAction(
  UPDATE_LOTTO_GAME_SUCCESS,
  resolve => (data: ILottoGame) => resolve(data))

const updateLottoGameFailureAction = createAction(
  UPDATE_LOTTO_GAME_FAILURE,
  resolve => (error: any) => resolve(error))

export default {
  getLottoGameAction,
  getLottoGameSuccessAction,
  getLottoGameFailureAction,
  getLottoGameCancelAction,
  updateLottoGameAction,
  updateLottoGameSuccessAction,
  updateLottoGameFailureAction,
}