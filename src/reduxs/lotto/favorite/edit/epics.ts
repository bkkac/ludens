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
import { fetchEditLottoFavorite, fetchEditLottoFavoriteNumber } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const editLottoFavoriteEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.editLottoFavoriteAction)),
    exhaustMap(action =>
      from(fetchEditLottoFavorite(action.payload))
        .pipe(
          map(actions.editLottoFavoriteSuccessAction),
          catchError(error => of(actions.editLottoFavoriteFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.editLottoFavoriteCancelAction))))
        ),
    )
  )

const editLottoFavoriteNumberEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.editLottoFavoriteNumberAction)),
    exhaustMap(action =>
      from(fetchEditLottoFavoriteNumber(action.payload))
        .pipe(
          map(actions.editLottoFavoriteSuccessAction),
          catchError(error => of(actions.editLottoFavoriteNumberFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.editLottoFavoriteNumberCancelAction))))
        ),
    )
  )

export default [
  editLottoFavoriteEpic,
  editLottoFavoriteNumberEpic,
]
