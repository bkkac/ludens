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
import { fetchDepositRequest } from './services'
import actions from './actions'

const depositEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.depositRequestAction)),
    exhaustMap(action =>
      from(fetchDepositRequest(action.payload))
        .pipe(
          map(actions.depositRequestSuccessAction),
          catchError(error => of(actions.depositRequestFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.depositRequestCancelAction))))
        ),
    )
  )

export default [
  depositEpic,
]
