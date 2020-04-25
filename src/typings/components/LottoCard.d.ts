type LottoType = | 'GOVN' | 'BAAC' | 'GSB' | 'LAO' | 'THAI_BROKER' | 'FOREIGN_BROKER' | 'YEEGE'

declare interface ILottoCard {
  type: LottoType
  data: ILotto
}