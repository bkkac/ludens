import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const loginReducer = (state: ILoginState = initialState, action: RootAction): ILoginState => {
  switch (action.type) {
    case getType(actions.logoutAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.logoutSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.data.code,
      }

    case getType(actions.logoutFailureAction):
      return {
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default loginReducer