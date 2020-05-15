import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { initialState } from './constants'
import actions from './actions'

const userReducer = (state: ITokenState = initialState, action: RootAction): ITokenState => {
  switch (action.type) {
    case getType(actions.persistedUserAction):
      return {
        ...state,
        accessToken: action.payload.token,
        refreshToken: action.payload.token,
      }
    default:
      return state
  }
}

export default userReducer