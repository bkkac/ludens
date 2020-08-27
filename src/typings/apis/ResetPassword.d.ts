declare interface IResetPasswordRequest {
  otp: string
  forgotPasswordId: number
  newPassowrd: string
  confirmPassword: string
}

declare interface IResetPasswordSuccess {
  
}