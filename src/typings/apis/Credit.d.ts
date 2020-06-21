declare type TCreditType = | 'WALLET' | 'BET'
declare type ICreditWalletType = | 'DEPOSIT' | 'WITHDRAW'

declare interface ICreditDetail {
  money: string | number
  type: ICreditWalletType | TLottoType
  status: TFinanceStatus | TBetStatus
  slug: string | null
  updatedAt: string
}

declare interface ICredit {
  groupType: TCreditType
  createdAt: string
  list: ICreditDetail[]
}