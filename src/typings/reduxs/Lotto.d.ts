declare interface IYeegeState {
  game: ReducerState<IYeegeGame[]>
  sum: ReducerState<string>
  play: ReducerState<IYeegePlay>
}

declare interface ILottoState {
  list: ReducerState<ILotto[]>
  yeege: IYeegeState
  bet: ReducerState<ILottoNumberBet[]>
}