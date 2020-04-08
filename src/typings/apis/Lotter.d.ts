declare interface ILottoNumber {
  name: string
  numbers?: string[]
  lotto?: ReadonlyArray<ILottoNumber>
}

declare interface ILotto {
  name: string
  code: string
  date: string | Date
  updateTime: string | Date
  lotto: ReadonlyArray<ILottoNumber>
}