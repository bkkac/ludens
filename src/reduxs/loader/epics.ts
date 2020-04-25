import { Epic } from 'redux-observable'
import { filter, concatMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'
import { of } from 'rxjs'

const loadingEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.loadingAction)),
    concatMap((action) => of(actions.loadingAction(action.payload)))
  )

export default [
  loadingEpic,
]
