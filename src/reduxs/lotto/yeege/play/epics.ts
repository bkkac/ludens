import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import {
  catchError,
  exhaustMap,
  takeUntil,
  mergeMap,
  filter,
} from 'rxjs/operators'
import moment from 'moment'
import { isActionOf } from 'typesafe-actions'
import { fetchYeegePlay } from './services'
import actions from './actions'
import sumAction from '../sum/actions'
import playedListAction from '../playedList/actions'
import { RootAction } from 'typings/reduxs/Actions'
import { AxiosResponse } from 'axios'

const getYeegeGameListEpic: Epic<RootAction, RootAction, RootReducers> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.playYeegeAction)),
    exhaustMap(action =>
      from(fetchYeegePlay(action.payload))
        .pipe(
          mergeMap((response: AxiosResponse<APISuccessResponse<IYeegePlay>>) => of(
            actions.playYeegeSuccessAction(response),
            // TODO: Temporary
            sumAction.getYeegeSumAction({
              date: moment(response.data.data.createdAt).format('DDMMYYYY'),
              round: response.data.data.round!,
            }),
            playedListAction.getPlayedYeegeListAction({
              date: moment(response.data.data.createdAt).format('DDMMYYYY'),
              round: response.data.data.round!,
            })
          )),
          catchError(error => of(actions.playYeegeFailureAction(error))),
          takeUntil(action$.pipe(filter(isActionOf(actions.playYeegeCancelAction))))
        ),
    )
  )

export default [
  getYeegeGameListEpic,
]
