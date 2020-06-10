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