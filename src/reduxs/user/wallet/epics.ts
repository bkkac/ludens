import { Epic } from 'redux-observable'
import {
  filter,
  map,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const walletUpdateSocketEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.walletUpdateRequestSocketAction)),
    map((action) => actions.walletUpdateSuccessSocketAction(action.payload))
  )

export default [
  walletUpdateSocketEpic,
]
