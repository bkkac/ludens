declare type TCreditType = | 'WALLET' | 'BET'
declare type ICreditWalletType = | 'DEPOSIT' | 'WITHDRAW'

declare interface ICreditWallet {
  money: number
  type: ICreditWalletType
  status: TFinanceStatus
  slug: null
  updatedAt: string
}

declare interface ICreditBet {
  money: string
  type: TLottoType
  status: TBetStatus
  slug: string
  updatedAt: string
}

declare interface ICredit {
  groupType: 'WALLET'
  createdAt: string
  list: ICreditWallet[]
}

declare interface ICredit {
  groupType: 'BET'
  createdAt: string
  list: ICreditBet[]
}