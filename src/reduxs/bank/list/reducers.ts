import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const depositReducer = (state: IBankListState = initialState, action: RootAction): IBankListState => {
  switch (action.type) {
    case getType(actions.getBankListAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getBankListSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data.dataList,
        code: action.payload.data.code,
      }
    case getType(actions.getBankListFailureAction):
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