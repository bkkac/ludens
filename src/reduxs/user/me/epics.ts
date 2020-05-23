import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import {
  catchError,
  exhaustMap,
  takeUntil,
  map,
  filter,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { fetchGetMe } from './services'
import actions from './actions'

const getMeEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store, dependencies) =>
  action$.pipe(
    filter(isActionOf(actions.getMeAction)),
    exhaustMap(_ =>
      from(fetchGetMe())
        .pipe(
          map(actions.getMeSuccessAction),
          catchError(error => of(actions.getMeFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getMeCancelAction))))
        ),
    )
  )

export default [
  getMeEpic,
]
