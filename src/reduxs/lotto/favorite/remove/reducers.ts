import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'
import { combineReducers } from 'redux'

const removeLottoFavoriteReducer = () => (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.removeLottoFavoriteAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.removeLottoFavoriteSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.removeLottoFavoriteFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.removeLottoFavoriteCancelAction):
      return initialState
    default:
      return state
  }
}

const removeLottoFavoriteNumberReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.removeLottoFavoriteNumberAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.removeLottoFavoriteNumberSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.removeLottoFavoriteNumberFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.removeLottoFavoriteNumberCancelAction):
      return initialState
    default:
      return state
  }
}

export default combineReducers({
  set: removeLottoFavoriteReducer,
  number: removeLottoFavoriteNumberReducer,
})