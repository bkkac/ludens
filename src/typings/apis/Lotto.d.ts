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