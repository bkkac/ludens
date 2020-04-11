import { createAsyncAction } from 'typesafe-actions'

export const GET_LOTTO_LIST_REQUEST = 'GET_LOTTO_LIST_REQUEST'
export const GET_LOTTO_LIST_SUCCESS = 'GET_LOTTO_LIST_SUCCESS'
export const GET_LOTTO_LIST_FAILURE = 'GET_LOTTO_LIST_FAILURE'
export const GET_LOTTO_LIST_CANCEL = 'GET_LOTTO_LIST_CANCEL'

export const initialState = {
  isFetching: false,
  data: {},
}

export const getLottoListAsync = createAsyncAction(
  'GET_LOTTO_LIST_REQUEST',
  'GET_LOTTO_LIST_SUCCESS',
  'GET_LOTTO_LIST_FAILURE',
  'GET_LOTTO_LIST_CANCEL'
)<string, any, Error, string>();
