import { createAction } from 'typesafe-actions'
import {
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  GET_TRANSACTION_LIST_FAILURE,
  GET_TRANSACTION_LIST_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getTransactionListAction = createAction(GET_TRANSACTION_LIST_REQUEST)

const getTransactionListSuccessAction = createAction(
  GET_TRANSACTION_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<ITransaction[]>>) => resolve(data))

const getTransactionListFailureAction = createAction(
  GET_TRANSACTION_LIST_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse<any>>) => resolve(error))

const getTransactionListCancelAction = createAction(GET_TRANSACTION_LIST_CANCEL)

export default {
  getTransactionListAction,
  getTransactionListSuccessAction,
  getTransactionListFailureAction,
  getTransactionListCancelAction,
}