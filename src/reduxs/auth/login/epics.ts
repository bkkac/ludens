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
import { fetchLogin } from './services'
import actions from './actions'

const loginEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.loginAction)),
    exhaustMap(action =>
      from(fetchLogin(action.payload))
        .pipe(
          map(actions.loginSuccessAction),
          catchError(error => of(actions.loginFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.loginCancelAction))))
        ),
    )
  )

export default [
  loginEpic,
]
