declare interface IResetPasswordRequest {
  otp: string
  forgotPasswordId: number
  newPassword: string
  confirmNewPassword: string
}

declare interface IResetPasswordSuccess {
  
}