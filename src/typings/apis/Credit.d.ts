declare type TCreditFinanceType = | 'FINANCE_DEPOSIT' | 'FINANCE_WITHDRAW'
declare type TCreditLottoType = | 'BET_LOTTER_YEGEE' | 'BET_LOTTER_GOVERNMENT'

declare type TTransactionType = | 'DEPOSIT' | 'WITHDRAW'

declare interface ICreditDetail {
  money: string
  numbers: string
  numbersBetResult: string
  type: TTransactionType | TLottoGameType
  status: TFinanceStatus | TBetStatus
  updatedAt: string
  createDate: string
  slug: string
}

declare interface ICredit {
  groupType: TCreditFinanceType | TCreditLottoType | ''
  createdAt: string
  money: number
  slug: string | null
  status: TFinanceStatus | TBetStatus | ''
  list: ICreditDetail[]
}