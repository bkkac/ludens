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
import { fetchMakingBetLotto } from './services'
import { RootAction } from 'typings/reduxs/Actions'
import actions from './actions'

const makingBetLottoEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.makingBetLottoAction)),
    exhaustMap(action =>
      from(fetchMakingBetLotto(action.payload))
        .pipe(
          map(actions.makingBetLottoSuccessAction),
          catchError(error => of(actions.makingBetLottoFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.makingBetLottoCancelAction))))
        ),
    )
  )

export default [
  makingBetLottoEpic,
]
