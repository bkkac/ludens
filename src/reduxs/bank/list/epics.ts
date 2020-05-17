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
import { fetchGetBankList } from './services'
import actions from './actions'

const getBankListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getBankListAction)),
    exhaustMap(_ =>
      from(fetchGetBankList())
        .pipe(
          map(actions.getBankListSuccessAction),
          catchError(error => of(actions.getBankListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getBankListCancelAction))))
        ),
    )
  )

export default [
  getBankListEpic,
]
