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
import { fetchYeegePlay } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getYeegeGameListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.playYeegeAction)),
    exhaustMap(action =>
      from(fetchYeegePlay(action.payload))
        .pipe(
          map(actions.playYeegeSuccessAction),
          catchError(error => of(actions.playYeegeFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.playYeegeCancelAction))))
        ),
    )
  )

export default [
  getYeegeGameListEpic,
]
