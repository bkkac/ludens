import { createAction } from 'typesafe-actions'
import {
  GET_BANK_LIST_REQUEST,
  GET_BANK_LIST_SUCCESS,
  GET_BANK_LIST_FAILURE,
  GET_BANK_LIST_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getBankListAction = createAction(GET_BANK_LIST_REQUEST)

const getBankListSuccessAction = createAction(
  GET_BANK_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IBank[]>>) => resolve(data))

const getBankListFailureAction = createAction(
  GET_BANK_LIST_FAILURE,
  resolve => (error: AxiosError) => resolve(error))

const getBankListCancelAction = createAction(GET_BANK_LIST_CANCEL)

export default {
  getBankListAction,
  getBankListSuccessAction,
  getBankListFailureAction,
  getBankListCancelAction,
}