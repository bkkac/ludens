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
          ...initialState,
          request: {
            ...initialState.request,
            isFetching: true,
          },
        }
      case getType(actions.getTransactionRequestSuccessAction):
      case getType(actions.signTransactionRequestSuccessAction):
        return {
          ...initialState,
          request: {
            ...initialState.request,
            isFetching: false,
            data: action.payload.data.data,
            code: action.payload.status,
          },
        }

      case getType(actions.getTransactionRequestFailureAction):
      case getType(actions.signTransactionRequestFailureAction):
        return {
          ...initialState,
          request: {
            ...initialState.request,
            isFetching: false,
            error: action.payload.response?.data.devMessage,
            code: action.payload.response?.status,
          },
        }
      // Canceling
      case getType(actions.cancelingTransactionRequestAction):
        return {
          ...initialState,
          cancel: {
            ...initialState.cancel,
            isFetching: true,
          },
        }
      case getType(actions.cancelingTransactionRequestSuccessAction):
        return {
          ...initialState,
          cancel: {
            ...initialState.cancel,
            isFetching: false,
            data: action.payload.data.data,
            code: action.payload.status,
          },
        }
      case getType(actions.cancelingTransactionRequestFailureAction):
        return {
          ...initialState,
          cancel: {
            ...initialState.cancel,
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