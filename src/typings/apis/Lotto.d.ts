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
  type: ILottoType
  value?: string
  slug?: string
}

declare interface ILottoNumberBet {
  number: string
  type: ILottoType
  value?: string
  slug?: string
  result: string
  status: TLottoMakedStatus
  createdAt: string
  updateAt: string
  userId: number
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
  createAt?: string
  user?: IUser
}