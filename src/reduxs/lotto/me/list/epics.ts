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
import { fetchGetBetHistory } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from '../actions'

const getBetHistoryEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getBetHistoryAction)),
    exhaustMap(_ =>
      from(fetchGetBetHistory())
        .pipe(
          map(actions.getBetHistorySuccessAction),
          catchError(error => of(actions.getBetHistoryFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getBetHistoryCancelAction))))
        ),
    )
  )

export default [
  getBetHistoryEpic,
]
