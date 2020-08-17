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
import { fetchYeegeGameList } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getYeegeGameListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getYeegeGameListAction)),
    exhaustMap(_ =>
      from(fetchYeegeGameList())
        .pipe(
          map(actions.getYeegeGameListSuccessAction),
          catchError(error => of(actions.getYeegeGameListFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getYeegeGameListCancelAction))))
        ),
    )
  )

const updateYeegeGameListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.updateYeegeGameListAction)),
    map((action) => actions.updateYeegeGameListSuccessAction(action.payload))
  )

export default [
  getYeegeGameListEpic,
  updateYeegeGameListEpic,
]
