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

declare interface ITransactionRequest {
  id?: number
  money?: number
  createdAt?: string
  userBank?: IBank
  webBank?: IBank
}

declare interface ISignTransactionRequest {
  webBankId: number
  money: string
}

declare interface ITransaction {
  id: number
  money: number,
  status: string,
  userTxTime: string,
  paySlipImage: string,
  userBankId: number,
  webBankId: number,
  walletId: number,
  createdAt: string,
  description: string,
  updatedAt: string,
  userId: number,
  type: string,
}