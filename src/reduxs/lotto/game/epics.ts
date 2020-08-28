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
import { fetchLottoGame as fetchYeegeGame } from '../yeege/game/services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getLottoListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getLottoAction)),
    exhaustMap(data => {
      const { slugname, round, date } = data.payload
      const getGame = () => (slugname === 'LOTTER_YEGEE')
        ? fetchLottoGame(slugname)
        : fetchYeegeGame({ round, date })
      return from(getGame)
        .pipe(
          map(actions.getLottoSuccessAction),
          catchError(error => of(actions.getLottoFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getLottoCancelAction))))
        )
    }
    )
  )

export default [
  getLottoListEpic,
]
