import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getBetRateReducer = (
  state: ReducerState<IBetRate[]> = initialState,
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
      return initialState
    default:
      return state
  }
}

export default getBetRateReducer