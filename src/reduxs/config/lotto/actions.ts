import { createAction } from 'typesafe-actions'
import {
  GET_LOTTO_SCHEDULE_REQUEST,
  GET_LOTTO_SCHEDULE_SUCCESS,
  GET_LOTTO_SCHEDULE_FAILURE,
  GET_LOTTO_SCHEDULE_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getLottoScheduleAction = createAction(GET_LOTTO_SCHEDULE_REQUEST)

const getLottoScheduleSuccessAction = createAction(
  GET_LOTTO_SCHEDULE_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<ILottoSchedule[]>>) => resolve(data))

const getLottoScheduleFailureAction = createAction(
  GET_LOTTO_SCHEDULE_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getLottoScheduleCancelAction = createAction(GET_LOTTO_SCHEDULE_CANCEL)

export default {
  getLottoScheduleAction,
  getLottoScheduleSuccessAction,
  getLottoScheduleFailureAction,
  getLottoScheduleCancelAction,
}