import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const registerReducer = (state: ReducerState = initialState, action: RootAction): ReducerState => {
  switch (action.type) {
    case getType(actions.getNewsroomAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getNewsroomSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.status,
      }

    case getType(actions.getNewsroomFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.code,
      }
    default:
      return state
  }
}

export default registerReducer