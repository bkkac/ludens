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
import { fetchGetPlayedYeegeList } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getYeegeGameListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getPlayedYeegeListAction)),
    exhaustMap(action =>
      from(fetchGetPlayedYeegeList(action.payload))
        .pipe(
          map(actions.getPlayedYeegeListSuccessAction),
          catchError(error => of(actions.getPlayedYeegeListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getPlayedYeegeListCancelAction))))
        ),
    )
  )

export default [
  getYeegeGameListEpic,
]
