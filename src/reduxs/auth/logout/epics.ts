import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import {
  exhaustMap,
  filter,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'
import userActions from 'reduxs/user/actions'
import loaderActions from 'reduxs/loader/actions'

const loginEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store, dependencies) =>
  action$.pipe(
    filter(isActionOf(actions.logoutAction)),
    exhaustMap((_) => of(
      loaderActions.loadingShow(),
      userActions.clearUserAction(),
      loaderActions.loadingHide(),
    ))
  )

export default [
  loginEpic,
]
