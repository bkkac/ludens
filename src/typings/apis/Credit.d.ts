declare interface IDepositRequest {
  money: string
  depositTime: string
  webBankId: number
  description: string
}

declare interface IWithdrawRequest {
  money: string
  description: string
}

declare interface IWallet {
  id?: number
  money?: number
  createdAt?: string
  updatedAt?: string
  updatedTime?: string
}