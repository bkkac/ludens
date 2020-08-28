import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const loginReducer = (state: IGetMeState = initialState, action: RootAction): IGetMeState => {
  switch (action.type) {
    case getType(actions.getMeAction):
      return {
        ...state,
        isFetching: true,
      }
    case getType(actions.getMeSuccessAction):
      return {
        isFetching: false,
        data: action.payload.data.data,
        code: action.payload.data.code,
      }

    case getType(actions.getMeFailureAction):
      return {
        isFetching: false,
        error: action.payload.response?.data.devMessage,
        code: action.payload.response?.data.code,
      }
    default:
      return state
  }
}

export default loginReducer