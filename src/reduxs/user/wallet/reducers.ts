import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import moment from 'moment-timezone'
import actions from './actions'

const coreSocketReducer = (state: IWallet = initialState, action: RootAction): IWallet => {
  switch (action.type) {
    case getType(actions.walletUpdateRequestSocketAction):
      return state
    case getType(actions.walletUpdateSuccessSocketAction):
      return {
        ...state,
        ...action.payload,
        updatedTime: moment().local().format(),
      }
    case getType(actions.walletUpdateFailureSocketAction):
      return state
    default:
      return state
  }
}

export default coreSocketReducer