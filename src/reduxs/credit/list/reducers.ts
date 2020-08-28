import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getCreditInfoListReducer = (
  state: ReducerState<ICredit[]> = initialState,
  action: RootAction
): ReducerState<ICredit[]> => {
  switch (action.type) {
    case getType(actions.getCreditInfoListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getCreditInfoListSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getCreditInfoListFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default getCreditInfoListReducer