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
import { fetchResetPassword } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const resetPasswordEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.resetPasswordAction)),
    exhaustMap(data =>
      from(fetchResetPassword(data.payload))
        .pipe(
          map(actions.resetPasswordSuccessAction),
          catchError(error => of(actions.resetPasswordFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.resetPasswordCancelAction))))
        ),
    )
  )

export default [
  resetPasswordEpic,
]
