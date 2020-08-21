import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<ILottoGame[]> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.getYeegeGameListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getYeegeGameListSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getYeegeGameListFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    case getType(actions.updateYeegeGameListAction):
      return {
        ...state,
      }
    case getType(actions.updateYeegeGameListSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      }

    case getType(actions.updateYeegeGameListFailureAction):
      return {
        ...state,
      }
    default:
      return state
  }
}

export default getYeegeGameListReducer