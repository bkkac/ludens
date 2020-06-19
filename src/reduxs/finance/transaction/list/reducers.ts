import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const depositReducer = (state: IDepositState = initialState, action: RootAction): IDepositState => {
  switch (action.type) {
    case getType(actions.getTransactionListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getTransactionListSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getTransactionListFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.status,
      }
    default:
      return state
  }
}

export default depositReducer