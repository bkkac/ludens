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
import { fetchAffilateMember } from './services'
import actions from './actions'

const affilateMemberEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.affilateMemberAction)),
    exhaustMap(action =>
      from(fetchAffilateMember(action.payload))
        .pipe(
          map(actions.affilateMemberSuccessAction),
          catchError(error => of(actions.affilateMemberFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.affilateMemberCancelAction))))
        ),
    )
  )

export default [
  affilateMemberEpic,
]
