import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialBetRateState, initialBetNumberRateState } from './constants'
import actions from './actions'
import { combineReducers } from 'redux'
import response from 'constants/response'

const getBetRateReducer = (
  state: ReducerState<IBetRate[]> = initialBetRateState,
  action: RootAction
): ReducerState<IBetRate[]> => {
  switch (action.type) {
    case getType(actions.getBetRateAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getBetRateSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getBetRateFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.clearBetRateAction):
      return initialBetRateState
    default:
      return state
  }
}

const getBetNumberRateReducer = (
  state: ReducerState<(IBetNumberRateRequest & { rate: string })[]> = initialBetNumberRateState,
  action: RootAction
): ReducerState<(IBetNumberRateRequest & { rate: string })[]> => {
  switch (action.type) {
    case getType(actions.getBetNumberRateAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getBetNumberRateSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        code: response.OK,
      }

    case getType(actions.getBetNumberRateFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        code: Number(action.payload.code) || response.BAD_REQUEST,
      }
    case getType(actions.clearBetNumberRateAction):
      return initialBetNumberRateState
    default:
      return state
  }
}

export default combineReducers({ rate: getBetRateReducer, number: getBetNumberRateReducer })