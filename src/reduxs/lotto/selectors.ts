import { get } from 'lodash'
import prject from 'constants/project'
import { initialBetRateState, initialBetNumberRateState } from './bet/rate/constants'

const betRates = (state: RootReducers): ReducerState<IBetRate[]> =>
    get(state, `${prject.name}.lotto.bet.rate.rate`, initialBetRateState)
const betNumberRate = (state: RootReducers): ReducerState<(IBetNumberRateRequest & { rate: string })[]> =>
    get(state, `${prject.name}.lotto.bet.rate.number`, initialBetNumberRateState)

export default {
    betRates,
    betNumberRate,
}