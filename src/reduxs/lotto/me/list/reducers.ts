import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getBetHistoryReducer = (
  state: ReducerState<IBet[]> = initialState,
  action: RootAction
): ReducerState<IBet[]> => {
  switch (action.type) {
    case getType(actions.getBetHistoryAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getBetHistorySuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getBetHistoryFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    default:
      return state
  }
}

export default getBetHistoryReducer