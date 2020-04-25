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
import { fetchRegister } from './services'
import actions from './actions'
import { RootAction } from 'typings/reduxs/Actions'

const registerEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.registerAction)),
    exhaustMap(action =>
      from(fetchRegister(action.payload))
        .pipe(
          map(actions.registerSuccessAction),
          catchError(error => of(actions.registerFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.registerCancelAction))))
        ),
    )
  )

export default [
  registerEpic,
]
