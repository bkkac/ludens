import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const affilateMemberReducer =
  (state: ReducerState<IWebConfig> = initialState, action: RootAction): ReducerState<IWebConfig> => {
    switch (action.type) {
      case getType(actions.getMeConfigAction):
        return {
          ...state,
          isFetching: true,
        }
      case getType(actions.getMeConfigSuccessAction):
        return {
          isFetching: false,
          data: action.payload.data.data,
          code: action.payload.status,
        }

      case getType(actions.getMeConfigFailureAction):
        return {
          isFetching: false,
          error: action.payload.response?.data.devMessage,
          code: action.payload.response?.status,
        }
      default:
        return state
    }
  }

export default affilateMemberReducer