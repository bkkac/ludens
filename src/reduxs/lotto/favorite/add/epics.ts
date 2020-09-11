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
import { fetchAddLottoFavorite, fetchAddLottoFavoriteNumber } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const addLottoFavoriteEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.addLottoFavoriteAction)),
    exhaustMap(action =>
      from(fetchAddLottoFavorite(action.payload))
        .pipe(
          map(actions.addLottoFavoriteSuccessAction),
          catchError(error => of(actions.addLottoFavoriteFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.addLottoFavoriteCancelAction))))
        ),
    )
  )

const addLottoFavoriteNumberEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.addLottoFavoriteNumberAction)),
    exhaustMap(action =>
      from(fetchAddLottoFavoriteNumber(action.payload))
        .pipe(
          map(actions.addLottoFavoriteSuccessAction),
          catchError(error => of(actions.addLottoFavoriteNumberFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.addLottoFavoriteNumberCancelAction))))
        ),
    )
  )

export default [
  addLottoFavoriteEpic,
  addLottoFavoriteNumberEpic,
]
