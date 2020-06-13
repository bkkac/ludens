import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<IYeegePlay> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.playYeegeAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.playYeegeSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }
    case getType(actions.playYeegeFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default getYeegeGameListReducer