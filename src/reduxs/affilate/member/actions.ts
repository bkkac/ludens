import { createAction } from 'typesafe-actions'
import {
  AFFILATE_MEMBER_REQUEST,
  AFFILATE_MEMBER_SUCCESS,
  AFFILATE_MEMBER_FAILURE,
  AFFILATE_MEMBER_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

// DDMMYYYY | MMYYYY
const affilateMemberAction = createAction(
  AFFILATE_MEMBER_REQUEST,
  resolve => (date: string) => resolve(date))

const affilateMemberSuccessAction = createAction(
  AFFILATE_MEMBER_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IAffilateMember[]>>) => resolve(data))

const affilateMemberFailureAction = createAction(
  AFFILATE_MEMBER_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const affilateMemberCancelAction = createAction(AFFILATE_MEMBER_CANCEL)

export default {
  affilateMemberAction,
  affilateMemberSuccessAction,
  affilateMemberFailureAction,
  affilateMemberCancelAction,
}