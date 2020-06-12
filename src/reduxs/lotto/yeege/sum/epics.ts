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
import { fetchYeegeSum } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const getYeegeSumEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getYeegeSumAction)),
    exhaustMap(action =>
      from(fetchYeegeSum(action.payload))
        .pipe(
          map(actions.getYeegeSumSuccessAction),
          catchError(error => of(actions.getYeegeSumFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getYeegeSumCancelAction))))
        ),
    )
  )

const updateYeegeSumEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.updateYeegeSumAction)),
    map((action) => actions.updateYeegeSumSuccessAction(action.payload))
  )

export default [
  getYeegeSumEpic,
  updateYeegeSumEpic,
]
