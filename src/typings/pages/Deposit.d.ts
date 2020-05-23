declare interface IDepositProps {
  getBankListIsFetching: boolean
  getBankListError: string
  getBankListCode: number | string
  bankList: IBank[]
  depositRequestResult: any
  depositRequestCode: number | string
  depositRequestError: string
  depositRequestIsFetching: boolean
  user: IUser
}

declare interface IDepositActionProps {
  getBankList(): void
  depositRequest(data: IDepositRequest): void
  loader(data: boolean): void
}

declare interface IDepositStates {
  currentStep: number
}

declare interface IDepositFormProps<T = any> {
  onConfirmPresses?(value?: IDeposit): void
  onCancelPresses?(): void,
  onBackStep?(currentStep: number): void
  extraProps?: T
}
