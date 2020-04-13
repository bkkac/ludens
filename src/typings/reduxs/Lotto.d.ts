declare interface ILottoListState {
  isFetching?: boolean
  data?: ILotto[]
  error?: string
  code?: number | string
}

declare interface ILottoState {
  list: ILottoListState
}