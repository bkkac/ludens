import { createAction } from 'typesafe-actions'
import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_REQUEST_SUCCESS,
  GET_TRANSACTION_REQUEST_FAILURE,
  GET_TRANSACTION_REQUEST_CANCEL,
  SIGN_TRANSACTION_REQUEST,
  SIGN_TRANSACTION_REQUEST_SUCCESS,
  SIGN_TRANSACTION_REQUEST_FAILURE,
  SIGN_TRANSACTION_REQUEST_CANCEL,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getTransactionRequestAction = createAction(GET_TRANSACTION_REQUEST)

const getTransactionRequestSuccessAction = createAction(
  GET_TRANSACTION_REQUEST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<ITransactionRequest>>) => resolve(data))

const getTransactionRequestFailureAction = createAction(
  GET_TRANSACTION_REQUEST_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse<any>>) => resolve(error))

const getTransactionRequestCancelAction = createAction(GET_TRANSACTION_REQUEST_CANCEL)

const signTransactionRequestAction = createAction(
  SIGN_TRANSACTION_REQUEST,
  resolve => (data: ISignTransactionRequest) => resolve(data))

const signTransactionRequestSuccessAction = createAction(
  SIGN_TRANSACTION_REQUEST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<ITransactionRequest>>) => resolve(data))

const signTransactionRequestFailureAction = createAction(
  SIGN_TRANSACTION_REQUEST_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse<any>>) => resolve(error))

const signTransactionRequestCancelAction = createAction(SIGN_TRANSACTION_REQUEST_CANCEL)

export default {
  getTransactionRequestAction,
  getTransactionRequestSuccessAction,
  getTransactionRequestFailureAction,
  getTransactionRequestCancelAction,
  signTransactionRequestAction,
  signTransactionRequestSuccessAction,
  signTransactionRequestFailureAction,
  signTransactionRequestCancelAction,
}