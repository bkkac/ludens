import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getBetRateReducer = (
  state: ReducerState<ReadonlyArray<IFavoriteSet>> = initialState,
  action: RootAction
): ReducerState<ReadonlyArray<IFavoriteSet>> => {
  switch (action.type) {
    case getType(actions.getLottoFavoriteListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getLottoFavoriteListSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getLottoFavoriteListFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.clearLottoFavoriteListAction):
      return initialState
    default:
      return state
  }
}

export default getBetRateReducer