import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const coreSocketReducer = (state: IWallet = initialState, action: RootAction): IWallet => {
  switch (action.type) {
    case getType(actions.walletUpdateRequestSocketAction):
      return state
    case getType(actions.walletUpdateSuccessSocketAction):
      return {
        ...state,
        ...action.payload,
        updatedTime: new Date().toISOString(),
      }
    case getType(actions.walletUpdateFailureSocketAction):
      return state
    default:
      return state
  }
}

export default coreSocketReducer