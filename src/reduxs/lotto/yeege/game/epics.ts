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
import { fetchLottoGame } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getLottoGameEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoGameAction)),
    exhaustMap(action =>
      from(fetchLottoGame(action.payload))
        .pipe(
          map(actions.getLottoGameSuccessAction),
          catchError(error => of(actions.getLottoGameFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoGameCancelAction))))
        ),
    )
  )

const updateLottoGameEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.updateLottoGameAction)),
    map((action) => actions.updateLottoGameSuccessAction(action.payload))
  )

export default [
  getLottoGameEpic,
  updateLottoGameEpic,
]
