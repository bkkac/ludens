declare interface IDepositState {
  isFetching?: boolean
  data?: any
  error?: string
  code?: number | string
}

declare interface IWithdrawState {
  isFetching?: boolean
  data?: any
  error?: string
  code?: number | string
}

declare interface ITransactionState {
  list: ReducerState<ITransaction[]>
}

declare interface ICreditState {
  deposit: IDepositState
  withdraw: IWithdrawState
  transaction: ITransactionState
  transactionRequest: ReducerState<ITransactionRequest>
}