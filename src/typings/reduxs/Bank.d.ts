declare interface IBankListState {
  isFetching?: boolean
  data?: IBank[]
  error?: string
  code?: number | string
}

declare interface IBankState {
  list: IBankListState
}