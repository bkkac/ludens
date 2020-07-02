import { createAction } from 'typesafe-actions'
import {
  GET_YEEGE_SUM_REQUEST,
  GET_YEEGE_SUM_SUCCESS,
  GET_YEEGE_SUM_FAILURE,
  GET_YEEGE_SUM_CANCEL,
  UPDATE_YEEGE_SUM_REQUEST,
  UPDATE_YEEGE_SUM_SUCCESS,
  UPDATE_YEEGE_SUM_FAILURE,
  CLEAR_YEEGE_SUM,
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getYeegeSumAction = createAction(
  GET_YEEGE_SUM_REQUEST,
  resolve => (data: IGetYeegeSum) => resolve(data))


const getYeegeSumSuccessAction = createAction(
  GET_YEEGE_SUM_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<string>>) => resolve(data))

const getYeegeSumFailureAction = createAction(
  GET_YEEGE_SUM_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const getYeegeSumCancelAction = createAction(GET_YEEGE_SUM_CANCEL)

const updateYeegeSumAction = createAction(
  UPDATE_YEEGE_SUM_REQUEST,
  resolve => (data: string) => resolve(data))

const updateYeegeSumSuccessAction = createAction(
  UPDATE_YEEGE_SUM_SUCCESS,
  resolve => (data: string) => resolve(data))

const updateYeegeSumFailureAction = createAction(
  UPDATE_YEEGE_SUM_FAILURE,
  resolve => (error: any) => resolve(error))

  const clearYeegeSum = createAction(CLEAR_YEEGE_SUM)

export default {
  clearYeegeSum,
  getYeegeSumAction,
  getYeegeSumSuccessAction,
  getYeegeSumFailureAction,
  getYeegeSumCancelAction,
  updateYeegeSumAction,
  updateYeegeSumSuccessAction,
  updateYeegeSumFailureAction,
}