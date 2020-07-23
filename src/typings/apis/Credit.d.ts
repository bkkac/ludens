declare type TCreditFinanceType = | 'FINANCE_DEPOSIT' | 'FINANCE_WITHDRAW'
declare type TCreditLottoType = | 'BET_LOTTER_YEGEE' | 'BET_LOTTER_GOVERNMENT'

declare type TTransactionType = | 'DEPOSIT' | 'WITHDRAW'

declare interface ICreditDetail {
  money: string | number
  numbers: string
  type: TTransactionType | TLottoGameType
  status: TFinanceStatus | TBetStatus
  updatedAt: string
}

declare interface ICredit {
  groupType: TCreditFinanceType | TCreditLottoType | ''
  createdAt: string
  money: number
  slug: string | null
  status: TFinanceStatus | TBetStatus | ''
  list: ICreditDetail[]
}