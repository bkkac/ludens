declare type IImageSet = {
  [name in TBankType]: {
    key: TBankType
    name?: string
    Icon: string
  }
}