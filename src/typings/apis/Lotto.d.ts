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

declare type ILottoStatus = 'OPEN' | 'CLOSE'

declare interface IYeegeGame {
  id: number
  round: string
  endTime: string
  startTime: string
  createdAt: string
  status: ILottoStatus
}