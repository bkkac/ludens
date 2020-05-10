import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const withdrawReducer = (state: IWithdrawState = initialState, action: RootAction): IWithdrawState => {
  switch (action.type) {
    case getType(actions.withdrawRequestAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.withdrawRequestSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.data.code,
      }

    case getType(actions.withdrawRequestFailureAction):
      return {
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default withdrawReducer