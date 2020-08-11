import { createAction } from 'typesafe-actions'
import {
  GET_ME_CONFIG_REQUEST,
  GET_ME_CONFIG_SUCCESS,
  GET_ME_CONFIG_FAILURE,
  GET_ME_CONFIG_CANCEL
} from './constants'
import { AxiosResponse, AxiosError } from 'axios'

const getMeConfigAction = createAction(GET_ME_CONFIG_REQUEST)

const getMeConfigSuccessAction = createAction(
  GET_ME_CONFIG_SUCCESS,
  resolve => (data: AxiosResponse<APIResponse<IWebConfig>>) => resolve(data))

const getMeConfigFailureAction = createAction(
  GET_ME_CONFIG_FAILURE,
  resolve => (error: AxiosError<APIResponse>) => resolve(error))

const getMeConfigCancelAction = createAction(GET_ME_CONFIG_CANCEL)

export default {
  getMeConfigAction,
  getMeConfigSuccessAction,
  getMeConfigFailureAction,
  getMeConfigCancelAction,
}