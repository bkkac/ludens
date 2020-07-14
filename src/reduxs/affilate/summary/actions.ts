import { createAction } from 'typesafe-actions'
import {
  AFFILATE_SUMMARY_REQUEST,
  AFFILATE_SUMMARY_SUCCESS,
  AFFILATE_SUMMARY_FAILURE,
  AFFILATE_SUMMARY_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const affilateSummaryAction = createAction(AFFILATE_SUMMARY_REQUEST)

const affilateSummarySuccessAction = createAction(
  AFFILATE_SUMMARY_SUCCESS,
  resolve => (data: AxiosResponse<APISuccessResponse<IAffilateSummary>>) => resolve(data))

const affilateSummaryFailureAction = createAction(
  AFFILATE_SUMMARY_FAILURE,
  resolve => (error: AxiosError<APISuccessResponse>) => resolve(error))

const affilateSummaryCancelAction = createAction(AFFILATE_SUMMARY_CANCEL)

export default {
  affilateSummaryAction,
  affilateSummarySuccessAction,
  affilateSummaryFailureAction,
  affilateSummaryCancelAction,
}