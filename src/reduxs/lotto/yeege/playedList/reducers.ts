import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<IYeegePlay[]> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.getPlayedYeegeListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getPlayedYeegeListSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }
    case getType(actions.getPlayedYeegeListFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    case getType(actions.updatePlayedYeegeListAction):
      return {
        ...state,
      }
    case getType(actions.updatePlayedYeegeListSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      }
    case getType(actions.clearPlayedYeegeList):
      return initialState
    default:
      return state
  }
}

export default getYeegeGameListReducer