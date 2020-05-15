import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const depositReducer = (state: IDepositState = initialState, action: RootAction): IDepositState => {
  switch (action.type) {
    case getType(actions.depositRequestAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.depositRequestSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.data.code,
      }

    case getType(actions.depositRequestFailureAction):
      return {
        isFetching: false,
        error: action.payload.message,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default depositReducer