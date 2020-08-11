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
import { RootAction } from 'typings/reduxs/Actions'
import { fetchGetMeConfig } from './services'
import actions from './actions'

const getMeConfigEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getMeConfigAction)),
    exhaustMap(_ =>
      from(fetchGetMeConfig())
        .pipe(
          map(actions.getMeConfigSuccessAction),
          catchError(error => of(actions.getMeConfigFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getMeConfigCancelAction))))
        ),
    )
  )

export default [
  getMeConfigEpic,
]
