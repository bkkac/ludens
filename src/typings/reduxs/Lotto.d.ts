declare interface ILottoListState {
  isFetching?: boolean
  data?: ILotto[]
  error?: string
  code?: number | string
}

declare interface IYeegeState {
  game: ReducerState<any>
}

declare interface ILottoState {
  list: ILottoListState
  yeege: IYeegeState
}