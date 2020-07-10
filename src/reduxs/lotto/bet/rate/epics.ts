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
import { fetchGetBetRate } from './services'
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

export default [
  getBetRateEpic,
]
