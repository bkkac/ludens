import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const forgotPasswordReducer =
  (state: ReducerState<IForgotPassword> = initialState, action: RootAction): ReducerState<IForgotPassword> => {
    switch (action.type) {
      case getType(actions.forgotPasswordAction):
        return {
          ...state,
          isFetching: true,
        }
      case getType(actions.forgotPasswordSuccessAction):
        return {
          isFetching: false,
          data: action.payload.data.data,
          code: action.payload.status,
        }

      case getType(actions.forgotPasswordFailureAction):
        return {
          isFetching: false,
          error: action.payload.response?.data.devMessage,
          code: action.payload.response?.data.code,
        }
      default:
        return state
    }
  }

export default forgotPasswordReducer