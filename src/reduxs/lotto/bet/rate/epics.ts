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
import { fetchGetBetRate, fetchGetBetNumberRate } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const getBetRateEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getBetRateAction)),
    exhaustMap(_ =>
      from(fetchGetBetRate())
        .pipe(
          map(actions.getBetRateSuccessAction),
          catchError(error => of(actions.getBetRateFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getBetRateCancelAction))))
        ),
    )
  )

const getBetNumberRateEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getBetNumberRateAction)),
    exhaustMap(action =>
      from(fetchGetBetNumberRate(action.payload))
        .pipe(
          map(actions.getBetNumberRateSuccessAction),
          catchError(error => of(actions.getBetNumberRateFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getBetNumberRateCancelAction))))
        ),
    )
  )

export default [
  getBetRateEpic,
  getBetNumberRateEpic,
]
