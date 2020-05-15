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

declare interface IBank {
  id: number
  type: string
  name: string
  number: string
  createdAt: string
  updatedAt: string
}

declare interface IWallet {
  id: number
  money: number
  createdAt: string
  updatedAt: string
}