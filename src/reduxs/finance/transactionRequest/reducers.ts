import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const transactionRequestReducer =
  (state: ReducerState<ITransactionRequest> = initialState, action: RootAction): ReducerState<ITransactionRequest> => {
    switch (action.type) {
      case getType(actions.getTransactionRequestAction):
      case getType(actions.signTransactionRequestAction):
        return {
          ...initialState,
          isFetching: true,
        }
      case getType(actions.getTransactionRequestSuccessAction):
      case getType(actions.signTransactionRequestSuccessAction):
        return {
          isFetching: false,
          data: action.payload.data.data,
          code: action.payload.status,
        }

      case getType(actions.getTransactionRequestFailureAction):
      case getType(actions.signTransactionRequestFailureAction):
        return {
          isFetching: false,
          error: action.payload.response?.data.devMessage,
          code: action.payload.response?.status,
        }
      default:
        return state
    }
  }

export default transactionRequestReducer