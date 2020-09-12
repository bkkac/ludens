import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'
import { combineReducers } from 'redux'

const addLottoFavoriteReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.addLottoFavoriteAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.addLottoFavoriteSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.addLottoFavoriteFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.addLottoFavoriteCancelAction):
      return initialState
    default:
      return state
  }
}

const addLottoFavoriteNumberReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.addLottoFavoriteNumberAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.addLottoFavoriteNumberSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.addLottoFavoriteNumberFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.addLottoFavoriteNumberCancelAction):
      return initialState
    default:
      return state
  }
}

export default combineReducers({
  set: addLottoFavoriteReducer,
  number: addLottoFavoriteNumberReducer,
})