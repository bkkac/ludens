declare interface IForgotPasswordRequest {
  username: string
  phoneNumber: string
}

declare interface IForgotPassword {
  id: number
  userId: number
  reqCount: number
  otp: number
  createdAt: string
  updatedAt: string
}