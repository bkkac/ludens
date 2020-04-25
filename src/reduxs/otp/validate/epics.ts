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
import { fetchOTPValidate } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const validateOTPEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.validateOTPAction)),
    exhaustMap(action =>
      from(fetchOTPValidate(action.payload))
        .pipe(
          map(actions.validateOTPSuccessAction),
          catchError(error => of(actions.validateOTPFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.validateOTPCancelAction))))
        ),
    )
  )

export default [
  validateOTPEpic,
]
