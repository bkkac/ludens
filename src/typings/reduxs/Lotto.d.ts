declare interface ILottoGameState {
  game: ReducerState<ILottoGame>
  gameList: ReducerState<ILottoGame[]>
  sum: ReducerState<string>
  play: ReducerState<IYeegePlay>
  playedList: ReducerState<IYeegePlay[]>
}

declare interface IBetHistoryState {
  list: ReducerState<IBet[]>
}

declare interface IBetState {
  make: ReducerState<IBet[]>
  rate: {
    rate: ReducerState<IBetRate[]>
    number: ReducerState<(IBetNumberRateRequest & { rate: string })[]>
  }
  result: ReducerState<IBetResult[]>
}

declare interface ILottoFavorite {
  list: ReducerState<ReadonlyArray<IFavoriteSet>>
}

declare interface ILottoState {
  list: ReducerState<ILotto[]>
  favorite: ILottoFavorite
  yeege: ILottoGameState
  game: ReducerState<ILottoGame>
  bet: IBetState
  me: IBetHistoryState
}