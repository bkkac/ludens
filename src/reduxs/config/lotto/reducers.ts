import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const affilateMemberReducer =
  (state: ReducerState<ILottoSchedule[]> = initialState, action: RootAction): ReducerState<ILottoSchedule[]> => {
    switch (action.type) {
      case getType(actions.getLottoScheduleAction):
        return {
          ...state,
          isFetching: true,
        }
      case getType(actions.getLottoScheduleSuccessAction):
        return {
          isFetching: false,
          data: action.payload.data.data,
          code: action.payload.status,
        }

      case getType(actions.getLottoScheduleFailureAction):
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