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
import { fetchLottoList } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getLottoListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoListAction)),
    exhaustMap(_ =>
      from(fetchLottoList())
        .pipe(
          map(actions.getLottoListSuccessAction),
          catchError(error => of(actions.getLottoListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoListCancelAction))))
        ),
    )
  )

export default [
  getLottoListEpic,
]
