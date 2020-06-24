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
import { fetchGetTransactionList } from './services'
import actions from './actions'

const transactionListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getTransactionListAction)),
    exhaustMap(_ =>
      from(fetchGetTransactionList())
        .pipe(
          map(actions.getTransactionListSuccessAction),
          catchError(error => of(actions.getTransactionListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getTransactionListCancelAction))))
        ),
    )
  )

export default [
  transactionListEpic,
]
