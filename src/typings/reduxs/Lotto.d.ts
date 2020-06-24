declare interface IYeegeState {
  game: ReducerState<IYeegeGame[]>
  sum: ReducerState<string>
  play: ReducerState<IYeegePlay>
  playedList: ReducerState<IYeegePlay[]>
}

declare interface IBetHistoryState {
  list: ReducerState<IBet[]>
}

declare interface IBetState {
  make: ReducerState<IBet[]>
  result: ReducerState<IBetResult[]>
}

declare interface ILottoState {
  list: ReducerState<ILotto[]>
  yeege: IYeegeState
  bet: IBetState
  me: IBetHistoryState
}