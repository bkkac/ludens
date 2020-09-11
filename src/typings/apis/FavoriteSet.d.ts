declare interface IFavoriteNumber {
  id: number
  number: string
  myNumberListId: number
  type: TLottoGameType
  createdAt: string
  updatedAt: strong
}

declare interface IFavoriteSet {
  id: number
  title: string
  list: ReadonlyArray<IFavoriteNumber>
  createdAt: string
  updatedAt: string
}

declare interface IFavoriteNumberRequest {
  id?: number
  myNumberListId?: number
  number: string
  type: string
}