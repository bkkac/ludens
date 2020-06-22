declare type TLottoType = | 'THREE_UP' | 'THREE_TOAST' | 'TWO_UP' | 'TWO_DOWN' | 'RUN_UP' | 'RUN_DOWN'

declare interface ILottoResult {
  name: string
  numbers?: string[]
  lotto?: ReadonlyArray<ILottoResult>
}

declare interface ILotto {
  name: string
  code: string
  updateTime: string
  lotto: ReadonlyArray<ILottoResult>
}

declare interface IYeegeGame {
  id: number
  round: string
  endTime: string
  startTime: string
  createdAt: string
  status: TLottoAvailableStatus
}

declare interface ILottoNumber {
  number: string
  type: TLottoType
  value?: string
  slug?: string
}

declare interface IGetYeegeSum {
  date: string
  round: string
}

declare interface IYeegePlayRequest {
  number: string
  round: string
}

declare interface IYeegePlay {
  id?: number
  number?: number
  round?: string
  createdAt?: string
  userId?: IUser
}

declare interface IBet {
  id?: number
  userId: number
  number: string
  type: TLot
  value?: string
  result: string
  status: TBetStatus
  slug?: string
  createdAt: string
  updatedAt: string
}