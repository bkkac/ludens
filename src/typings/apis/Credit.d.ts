declare interface IDepositRequest {
  bankType: string
  amount: string
  remark: string
  depositHours: string
  depositMinuite: string
}

declare interface IWithdrawRequest {
  amount: string
  remark: string
}