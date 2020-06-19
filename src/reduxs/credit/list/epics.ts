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
import { fetchGetCreditInfo } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getCreditInfoEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getCreditInfoListAction)),
    exhaustMap(_ =>
      from(fetchGetCreditInfo())
        .pipe(
          map(actions.getCreditInfoListSuccessAction),
          catchError(error => of(actions.getCreditInfoListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getCreditInfoListCancelAction))))
        ),
    )
  )

export default [
  getCreditInfoEpic,
]
