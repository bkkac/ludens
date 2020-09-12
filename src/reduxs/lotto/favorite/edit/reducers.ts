import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'
import { combineReducers } from 'redux'

const editLottoFavoriteReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.editLottoFavoriteAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.editLottoFavoriteSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.editLottoFavoriteFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.editLottoFavoriteCancelAction):
      return initialState
    default:
      return state
  }
}

const editLottoFavoriteNumberReducer = (
  state: ReducerState<IFavoriteSet> = initialState,
  action: RootAction
): ReducerState<IFavoriteSet> => {
  switch (action.type) {
    case getType(actions.editLottoFavoriteNumberAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.editLottoFavoriteNumberSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.editLottoFavoriteNumberFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    case getType(actions.editLottoFavoriteNumberCancelAction):
      return initialState
    default:
      return state
  }
}

export default combineReducers({
  set: editLottoFavoriteReducer,
  number: editLottoFavoriteNumberReducer,
})