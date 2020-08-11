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
import { fetchGetLottoFavoriteList } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const getLottoFavoriteListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoFavoriteListAction)),
    exhaustMap(_ =>
      from(fetchGetLottoFavoriteList())
        .pipe(
          map(actions.getLottoFavoriteListSuccessAction),
          catchError(error => of(actions.getLottoFavoriteListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoFavoriteListCancelAction))))
        ),
    )
  )

export default [
  getLottoFavoriteListEpic,
]
