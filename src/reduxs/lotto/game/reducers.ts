import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getLottoListReducer = (
  state: ReducerState<ILottoGame> = initialState,
  action: RootAction
): ReducerState<ILottoGame> => {
  switch (action.type) {
    case getType(actions.getLottoAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getLottoSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getLottoFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default getLottoListReducer