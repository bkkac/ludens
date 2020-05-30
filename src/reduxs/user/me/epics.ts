import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import {
  catchError,
  exhaustMap,
  takeUntil,
  mergeMap,
  filter,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import { fetchGetMe } from './services'
import actions from '../actions'
import { AxiosResponse } from 'axios'

const getMeEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store, dependencies) =>
  action$.pipe(
    filter(isActionOf(actions.getMeAction)),
    exhaustMap(_ =>
      from(fetchGetMe())
        .pipe(
          mergeMap((response: AxiosResponse<APISuccessResponse<IUser>>) => of(
            actions.getMeSuccessAction(response),
            actions.walletUpdateRequestSocketAction(response.data.data.wallet!)
          )),
          catchError(error => of(actions.getMeFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.getMeCancelAction))))
        ),
    )
  )

export default [
  getMeEpic,
]
