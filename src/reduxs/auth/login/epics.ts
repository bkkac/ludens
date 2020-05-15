import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import {
  catchError,
  exhaustMap,
  takeUntil,
  mergeMap,
  filter,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { fetchLogin } from './services'
import actions from './actions'
import userActions from 'reduxs/user/actions'

const loginEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store, dependencies) =>
  action$.pipe(
    filter(isActionOf(actions.loginAction)),
    exhaustMap(action =>
      from(fetchLogin(action.payload))
        .pipe(
          mergeMap((response) => of(
            actions.loginSuccessAction(response),
            userActions.persistedUserAction({ token: 'TESTTOKENHAJA555' }) // TODO
          )),
          catchError(error => of(
            actions.loginFailureAction(error),
            userActions.clearUserAction()
          )),
          takeUntil(action$.pipe(filter(isActionOf(actions.loginCancelAction))))
        ),
    )
  )

export default [
  loginEpic,
]
