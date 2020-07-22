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
import { fetchGetLottoSchedule } from './services'
import actions from './actions'

const getLottoScheduleEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoScheduleAction)),
    exhaustMap(_ =>
      from(fetchGetLottoSchedule())
        .pipe(
          map(actions.getLottoScheduleSuccessAction),
          catchError(error => of(actions.getLottoScheduleFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoScheduleCancelAction))))
        ),
    )
  )

export default [
  getLottoScheduleEpic,
]
