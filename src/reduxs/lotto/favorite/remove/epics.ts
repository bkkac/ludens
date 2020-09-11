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
import { fetchRemoveLottoFavorite, fetchRemoveLottoFavoriteNumber } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const removeLottoFavoriteEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.removeLottoFavoriteAction)),
    exhaustMap(action =>
      from(fetchRemoveLottoFavorite(action.payload))
        .pipe(
          map(actions.removeLottoFavoriteSuccessAction),
          catchError(error => of(actions.removeLottoFavoriteFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.removeLottoFavoriteCancelAction))))
        ),
    )
  )

const removeLottoFavoriteNumberEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.removeLottoFavoriteNumberAction)),
    exhaustMap(action =>
      from(fetchRemoveLottoFavoriteNumber(action.payload))
        .pipe(
          map(actions.removeLottoFavoriteSuccessAction),
          catchError(error => of(actions.removeLottoFavoriteNumberFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.removeLottoFavoriteNumberCancelAction))))
        ),
    )
  )

export default [
  removeLottoFavoriteEpic,
  removeLottoFavoriteNumberEpic,
]
