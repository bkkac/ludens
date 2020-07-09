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
import { RootAction } from 'typings/reduxs/Actions'
import { fetchAffilateSummary } from './services'
import actions from './actions'

const affilateSummaryEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.affilateSummaryAction)),
    exhaustMap(_ =>
      from(fetchAffilateSummary())
        .pipe(
          map(actions.affilateSummarySuccessAction),
          catchError(error => of(actions.affilateSummaryFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.affilateSummaryCancelAction))))
        ),
    )
  )

export default [
  affilateSummaryEpic,
]
