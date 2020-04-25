declare interface IRegisterProps {
  requestOTPIsFetching: boolean
  requestOTPError: string
  requestOTPCode: number | string
  otp?: IOTP

  validateOTPIsFetching: boolean
  validateOTPError: string
  validateOTPCode: number | string
  validateResult: boolean

  registerIsFetching: boolean
  registerError: string
  registerCode: number | string
  registerResult: any
}

declare interface IRegisterActionProps {
  requestOTP(mobileNumber: string): void
  validateOTP(data: { phoneNumber: string, otp: string }): void
  register(data: IRegisterRequest): void
  loading(data: boolean): void
}

declare interface IRegisterStates {
  currentStep: number
  activePhoneNumber: boolean
}

declare interface IRegisterFormProps<T = any> {
  onConfirmPresses?(currentStep: number, value?: IRegister): void
  onBackStep?(currentStep: number): void
  extraProps?: T
}


declare interface IHomeProps {
  getLottoIsFetching: boolean
  getLottoError: string
  getLottoCode: number | string
  lottoList: ILotto[]
}