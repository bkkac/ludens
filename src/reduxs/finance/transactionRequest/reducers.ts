import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const transactionRequestReducer =
  (state: ITransactionRequestState = initialState, action: RootAction): ITransactionRequestState => {
    switch (action.type) {
      // Request & Get
      case getType(actions.getTransactionRequestAction):
      case getType(actions.signTransactionRequestAction):
        return {
          ...state,
          request: {
            ...state.request,
            isFetching: true,
          },
        }
      case getType(actions.getTransactionRequestSuccessAction):
      case getType(actions.signTransactionRequestSuccessAction):
        return {
          ...state,
          request: {
            ...state.request,
            isFetching: false,
            data: action.payload.data.data,
            code: action.payload.status,
          },
        }

      case getType(actions.getTransactionRequestFailureAction):
      case getType(actions.signTransactionRequestFailureAction):
        return {
          ...state,
          request: {
            ...state.request,
            isFetching: false,
            error: action.payload.response?.data.devMessage,
            code: action.payload.response?.status,
          },
        }
      // Canceling
      case getType(actions.cancelingTransactionRequestAction):
        return {
          ...state,
          cancel: {
            ...state.cancel,
            isFetching: true,
          },
        }
      case getType(actions.cancelingTransactionRequestSuccessAction):
        return {
          ...state,
          cancel: {
            ...state.cancel,
            isFetching: false,
            data: action.payload.data.data,
            code: action.payload.status,
          },
        }
      case getType(actions.cancelingTransactionRequestFailureAction):
        return {
          ...state,
          cancel: {
            ...state.cancel,
            isFetching: false,
            error: action.payload.response?.data.devMessage,
            code: action.payload.response?.status,
          },
        }
      default:
        return state
    }
  }

export default transactionRequestReducer