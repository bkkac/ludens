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

declare interface ICreditState {
  deposit: IDepositState
  withdraw: IWithdrawState
}