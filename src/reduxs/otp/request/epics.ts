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
import { fetchOTPRequest } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getOTPEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) => action$.pipe(
  filter(isActionOf(actions.getOTPAction)),
  exhaustMap(action => from(fetchOTPRequest(action.payload))
    .pipe(
      map(actions.getOTPSuccessAction),
      catchError(error => of(actions.getOTPFailureAction(error))),
      takeUntil(action$.pipe(filter(isActionOf(actions.getOTPCancelAction))))
    )
  )
)

export default [
  getOTPEpic,
]
