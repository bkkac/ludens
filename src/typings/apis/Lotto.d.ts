declare interface ILottoNumber {
  name: string
  numbers?: string[]
  lotto?: ReadonlyArray<ILottoNumber>
}

declare interface ILotto {
  name: string
  code: string
  updateTime: string
  lotto: ReadonlyArray<ILottoNumber>
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