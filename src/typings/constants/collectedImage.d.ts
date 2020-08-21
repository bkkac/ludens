declare type IImageSet = {
  [name in TBankType]: {
    key: TBankType
    name?: string
    Icon: string
  }
}

declare type IImageFlag = {
  [name in TFlag]: {
    name?: string
    Icon: string
  }
}