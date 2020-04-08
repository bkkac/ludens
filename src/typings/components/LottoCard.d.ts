type LottoType = | 'GOVERNMENT' | 'BAAC' | 'GSB' | 'LAO_SET' | 'THAI_BROKER' | 'FOREIGN_BROKER' | 'YEEGE'

declare interface ILottoCard {
  type: LottoType
  data: ILotto
}