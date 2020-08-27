declare interface IDepositProps {
  getBankListIsFetching: boolean
  getBankListError: string
  getBankListCode: number | string
  bankList: IBank[]
  depositRequestResult: any
  depositRequestCode: number | string
  depositRequestError: string
  depositRequestIsFetching: boolean
  transactionRequest: ITransactionRequest
  transactionRequestCode: number | string
  transactionRequestError: string
  transactionRequestIsFetching: boolean
  transactionCancel: ITransactionRequest
  transactionCancelCode: number | string
  transactionCancelError: string
  transactionCancelIsFetching: boolean
  user: IUser
}

declare interface IDepositActionProps {
  getBankList(): void
  depositRequest(data: IDepositRequest): void
  loader(data: boolean): void
  getTransactionRequest(): void
  signTransactionRequest(data: ISignTransactionRequest): void
  cancelingTransactionRequest(transactionRequestId: number): void
}

declare interface IDepositStates {
  currentStep: number
  initialFormValue: IDepositForm
}

declare interface IDepositFormProps<T = any> {
  onConfirmPresses?(value?: IDeposit): void
  onCancelPresses?(): void,
  onBackStep?(currentStep: number): void
  extraProps?: T
}
