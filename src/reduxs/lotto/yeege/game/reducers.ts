import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<ILottoGame> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.getLottoGameAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getLottoGameSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getLottoGameFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    case getType(actions.updateLottoGameAction):
      return {
        ...state,
      }
    case getType(actions.updateLottoGameSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      }

    case getType(actions.updateLottoGameFailureAction):
      return {
        ...state,
      }
    default:
      return state
  }
}

export default getYeegeGameListReducer