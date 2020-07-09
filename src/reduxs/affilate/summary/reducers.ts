import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const affilateSummaryReducer =
  (state: ReducerState<IAffilateSummary> = initialState, action: RootAction): ReducerState<IAffilateSummary> => {
    switch (action.type) {
      case getType(actions.affilateSummaryAction):
        return {
          ...state,
          isFetching: true,
        }
      case getType(actions.affilateSummarySuccessAction):
        return {
          isFetching: false,
          data: action.payload.data.data,
          code: action.payload.status,
        }

      case getType(actions.affilateSummaryFailureAction):
        return {
          isFetching: false,
          error: action.payload.response?.data.devMessage,
          code: action.payload.response?.status,
        }
      default:
        return state
    }
  }

export default affilateSummaryReducer