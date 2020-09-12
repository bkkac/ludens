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
import { fetchGetLottoFavorite } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const getLottoFavoriteEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoFavoriteAction)),
    exhaustMap(action =>
      from(fetchGetLottoFavorite(action.payload))
        .pipe(
          map(actions.getLottoFavoriteSuccessAction),
          catchError(error => of(actions.getLottoFavoriteFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoFavoriteCancelAction))))
        ),
    )
  )

export default [
  getLottoFavoriteEpic,
]
