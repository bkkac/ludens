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
import { fetchWithdrawRequest } from './services'
import actions from './actions'

const withdrawEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.withdrawRequestAction)),
    exhaustMap(action =>
      from(fetchWithdrawRequest(action.payload))
        .pipe(
          map(actions.withdrawRequestSuccessAction),
          catchError(error => of(actions.withdrawRequestFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.withdrawRequestCancelAction))))
        ),
    )
  )

export default [
  withdrawEpic,
]
