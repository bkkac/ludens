declare interface IUser {
  id?: number
  username?: string
  walletId?: number
  userBankId?: number
  createAt?: string
  updatedAt?: string
  phoneNumber?: string
  
  bank?: IBank
  wallet?: IWallet

  updatedTime?: Date // Temp
}