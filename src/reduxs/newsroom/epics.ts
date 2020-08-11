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
import { fetchGetNewsroom } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getNewsroomEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getNewsroomAction)),
    exhaustMap(_ =>
      from(fetchGetNewsroom())
        .pipe(
          map(actions.getNewsroomSuccessAction),
          catchError(error => of(actions.getNewsroomFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getNewsroomCancelAction))))
        ),
    )
  )

export default [
  getNewsroomEpic,
]
