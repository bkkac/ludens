import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const coreSocketReducer = (state: ICoreSocketState = initialState, action: RootAction): ICoreSocketState => {
  switch (action.type) {
    case getType(actions.connectSocketAction):
      return {
        ...state,
        connected: false,
      }
    case getType(actions.connectedSocketAction):
      return {
        connected: true,
      }
    case getType(actions.connectSocketErrorAction):
      return {
        connected: false,
      }
    case getType(actions.disconnectSocketAction):
      return {
        connected: false,
      }
    case getType(actions.disconnectedSocketAction):
      return {
        connected: false,
      }
    default:
      return state
  }
}

export default coreSocketReducer