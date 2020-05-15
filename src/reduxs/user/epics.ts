import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import {
  exhaustMap,
  filter,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const setUserEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf([actions.setUserAction, actions.clearUserAction])),
    exhaustMap((action) => of(actions.persistedUserAction(action.payload)))
  )

export default [
  setUserEpic,
]
