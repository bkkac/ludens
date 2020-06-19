import { createAction } from 'typesafe-actions'
import {
  GET_CREDIT_INFO_LIST_REQUEST,
  GET_CREDIT_INFO_LIST_SUCCESS,
  GET_CREDIT_INFO_LIST_FAILURE,
  GET_CREDIT_INFO_LIST_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getCreditInfoListAction = createAction(GET_CREDIT_INFO_LIST_REQUEST)

const getCreditInfoListSuccessAction = createAction(
  GET_CREDIT_INFO_LIST_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<ICredit[]>>) => resolve(data))

const getCreditInfoListFailureAction = createAction(
  GET_CREDIT_INFO_LIST_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const getCreditInfoListCancelAction = createAction(GET_CREDIT_INFO_LIST_CANCEL)

export default {
  getCreditInfoListAction,
  getCreditInfoListSuccessAction,
  getCreditInfoListFailureAction,
  getCreditInfoListCancelAction,
}