
import { from, of } from 'rxjs'
import { takeUntil, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable'
import { filter, map, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { IRootReducers } from 'configs/reducers'
import { fetchLottoList } from './services'
import { getLottoListAsync } from './constants'

const getLottoListEpic: Epic<any, any, IRootReducers> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getLottoListAsync.request)),
    switchMap(action =>
      from(fetchLottoList())
        .pipe(
          map(getLottoListAsync.success),
          catchError((error) => of(getLottoListAsync.failure(error))),
          takeUntil(action$.pipe(filter(isActionOf(getLottoListAsync.cancel)))),
        )
    )
  )


export default [
  getLottoListEpic,
]