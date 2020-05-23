declare interface IWithdrawProps {
  withdrawRequestResult: any
  withdrawRequestCode: number | string
  withdrawRequestError: string
  withdrawRequestIsFetching: boolean
  user: IUser
}

declare interface IWithdrawActionProps {
  withdrawRequest(data: IWithdrawRequest): void
  loader(data: boolean): void
}

declare interface IWithdrawFormProps<T = any> {
  onCancelPresses?(): void,
  onBackPresses?(): void
  extraProps?: T
}
