import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getLottoFavoriteReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.getLottoFavoriteAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getLottoFavoriteSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getLottoFavoriteFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.getLottoFavoriteCancelAction):
      return initialState
    default:
      return state
  }
}

export default getLottoFavoriteReducer