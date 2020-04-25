import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getOTPReducer = (state: IOTPValidateState = initialState, action: RootAction): IOTPValidateState => {
  switch (action.type) {
    case getType(actions.validateOTPAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.validateOTPSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.validateOTPFailureAction):
      return {
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default getOTPReducer