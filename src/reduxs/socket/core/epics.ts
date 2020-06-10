import { Epic, StateObservable } from 'redux-observable'
import {
  filter,
  map,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'
import actionUser from 'reduxs/user/actions'


const socketErrorEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store: StateObservable<RootReducers>) =>
  action$.pipe(
    filter(isActionOf(actions.connectSocketErrorAction)),
    map(actionUser.clearUserAction)
  )

export default [
  socketErrorEpic,
]
