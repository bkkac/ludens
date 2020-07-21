import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const loginReducer = (state: ILoginState = initialState, action: RootAction): ILoginState => {
  switch (action.type) {
    case getType(actions.loginAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.loginSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.data.code,
      }

    case getType(actions.loginFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default loginReducer