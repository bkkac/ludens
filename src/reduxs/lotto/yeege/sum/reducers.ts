import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<string> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.getYeegeSumAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getYeegeSumSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getYeegeSumFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
        data: '0',
      }
    case getType(actions.updateYeegeSumAction):
      return {
        ...state,
      }
    case getType(actions.updateYeegeSumSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      }

    case getType(actions.updateYeegeSumFailureAction):
      return {
        ...state,
      }
    default:
      return state
  }
}

export default getYeegeGameListReducer