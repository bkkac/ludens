import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getLottoListReducer = (
  state: ReducerState<ILotto[]> = initialState,
  action: RootAction
): ReducerState<ILotto[]> => {
  switch (action.type) {
    case getType(actions.getLottoListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getLottoListSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getLottoListFailureAction):
      return {
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default getLottoListReducer