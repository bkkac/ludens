import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const getOTPReducer = (state: IOTPRequestState = initialState, action: RootAction): IOTPRequestState => {
  switch (action.type) {
    case getType(actions.getOTPAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getOTPSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getOTPFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.data,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default getOTPReducer