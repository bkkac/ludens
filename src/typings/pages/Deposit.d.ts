declare interface IDepositProps {
}

declare interface IDepositActionProps {
  // requestOTP(mobileNumber: string): void
  // validateOTP(data: { phoneNumber: string, otp: string }): void
  // register(data: IDepositRequest): void
  // loading(data: boolean): void
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
