import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const loadingReducer = (state: boolean = false, action: RootAction): boolean => {
  switch (action.type) {
    case getType(actions.loadingAction):
      return action.payload
    default:
      return state
  }
}

export default loadingReducer