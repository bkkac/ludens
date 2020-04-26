import { Epic } from 'redux-observable'
import { filter, exhaustMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'
import { of } from 'rxjs'

const loadingEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.loadingAction)),
    exhaustMap((action) => {
      if (action.payload) { return of(actions.loadingShow()) }
      return of(actions.loadingHide())
    })
  )

export default [
  loadingEpic,
]
