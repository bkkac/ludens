declare interface IForgotPasswordProps {
  requestedForgotPassword: IForgotPassword
  forgotPasswordIsFetching: boolean
  forgotPasswordCode: number
  forgotPasswordError: string
  resetPasswordIsFetching: boolean
  resetPasswordCode: number
  resetPasswordError: string
}

declare interface IForgotPasswordActionProps {
  forgotPasswordRequest(data: IForgotPasswordRequest): void
  resetPassword(data: IResetPasswordRequest): void
  loader(state: boolean): void
}

declare interface IForgotPasswordForm {
  username: string
  phoneNumber: string
  otp: string
  newPassword: string
  confirmNewPassword: string
}

declare interface IForgotPasswordFormProps {
  handleOtpRequest(username: string, phoneNumber: string): void
}