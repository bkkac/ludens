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
  rate: ReducerState<IBetRate[]>
  result: ReducerState<IBetResult[]>
}

declare interface ILottoFavorite {
  list: ReducerState<ReadonlyArray<IFavoriteSet>>
}

declare interface ILottoState {
  list: ReducerState<ILotto[]>
  favorite: ILottoFavorite
  yeege: IYeegeState
  bet: IBetState
  me: IBetHistoryState
}