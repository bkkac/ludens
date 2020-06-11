declare interface IYeegeState {
  game: ReducerState<any>
}

declare interface ILottoState {
  list: ReducerState<ILotto[]>
  yeege: IYeegeState
  bet: ReducerState<ILottoNumberBet[]>
}