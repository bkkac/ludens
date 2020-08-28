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
import { fetchForgotPassword } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const forgotPasswordEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.forgotPasswordAction)),
    exhaustMap(data =>
      from(fetchForgotPassword(data.payload))
        .pipe(
          map(actions.forgotPasswordSuccessAction),
          catchError(error => of(actions.forgotPasswordFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.forgotPasswordCancelAction))))
        ),
    )
  )

export default [
  forgotPasswordEpic,
]
