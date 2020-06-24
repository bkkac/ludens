import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getBetResultReducer = (
  state: ReducerState<IBetResult[]> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.getBetResultAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getBetResultSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getBetResultFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.clearBetResultAction):
      return initialState
    default:
      return state
  }
}

export default getBetResultReducer