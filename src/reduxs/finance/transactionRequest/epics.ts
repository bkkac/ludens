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
import { fetchGetTransactionRequest, fetchSignTransactionRequest, fetchCancelingTransactionRequest } from './services'
import actions from './actions'

const getTransactionRequestEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getTransactionRequestAction)),
    exhaustMap(_ =>
      from(fetchGetTransactionRequest())
        .pipe(
          map(actions.getTransactionRequestSuccessAction),
          catchError(error => of(actions.getTransactionRequestFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getTransactionRequestCancelAction))))
        ),
    )
  )

const signTransactionRequestEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.signTransactionRequestAction)),
    exhaustMap(action =>
      from(fetchSignTransactionRequest(action.payload))
        .pipe(
          map(actions.signTransactionRequestSuccessAction),
          catchError(error => of(actions.signTransactionRequestFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.signTransactionRequestCancelAction))))
        ),
    )
  )

const cancelingTransactionRequestEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.cancelingTransactionRequestAction)),
    exhaustMap(action =>
      from(fetchCancelingTransactionRequest(action.payload))
        .pipe(
          map(actions.cancelingTransactionRequestSuccessAction),
          catchError(error => of(actions.cancelingTransactionRequestFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.cancelingTransactionRequestCancelAction))))
        ),
    )
  )

export default [
  getTransactionRequestEpic,
  signTransactionRequestEpic,
  cancelingTransactionRequestEpic,
]
