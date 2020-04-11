import { createReducer } from 'typesafe-actions'
import {
  GET_LOTTO_LIST_REQUEST,
  GET_LOTTO_LIST_SUCCESS,
  initialState
} from '../constants'

export const getLottoListReducer = createReducer({})
  .handleAction(GET_LOTTO_LIST_REQUEST, (state: typeof initialState, action: any) =>
    ({ ...state, isFetching: true }))
  .handleAction(GET_LOTTO_LIST_SUCCESS, (state: typeof initialState, action: any) =>
    ({ ...state, isFetching: false, data: action }))