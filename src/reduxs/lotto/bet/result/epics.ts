import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import {
  catchError,
  exhaustMap,
  takeUntil,
  filter,
  map,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { fetchGetBetResult } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const getBetResultEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getBetResultAction)),
    exhaustMap(action =>
      from(fetchGetBetResult(action.payload))
        .pipe(
          map(actions.getBetResultSuccessAction),
          catchError(error => of(actions.getBetResultFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getBetResultCancelAction))))
        ),
    )
  )

export default [
  getBetResultEpic,
]
