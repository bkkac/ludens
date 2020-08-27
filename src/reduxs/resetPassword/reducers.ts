import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const resetPasswordReducer = (
  state: ReducerState<IResetPasswordSuccess> = initialState, action: RootAction
): ReducerState<IResetPasswordSuccess> => {
  switch (action.type) {
    case getType(actions.resetPasswordAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.resetPasswordSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.resetPasswordFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default resetPasswordReducer