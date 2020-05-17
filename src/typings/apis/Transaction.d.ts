declare interface ITransaction {
  id: number
  money: number,
  status: string,
  userTxTime: string,
  paySlipImage: string,
  userId: number,
  userBankId: number,
  webBankId: number,
  walletId: number,
  createdAt: string,
  updatedAt: string
}