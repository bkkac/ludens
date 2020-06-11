import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getYeegeGameListReducer = (
  state: ReducerState<ILottoNumberBet[]> = initialState,
  action: RootAction
): ReducerState<any> => {
  switch (action.type) {
    case getType(actions.makingBetLottoAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.makingBetLottoSuccessAction):
      return {
        ...state,
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.makingBetLottoFailureAction):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default getYeegeGameListReducer