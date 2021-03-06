declare interface ILottoFavoriteProps {
  getLottoFavoriteListIsFetching: boolean
  getLottoFavoriteListCode: number | string
  getLottoFavoriteListError: string
  lottoFavoriteList: ReadonlyArray<IFavoriteSet>
}

declare interface ILottoFavoriteActionProps {
  getLottoFavoriteList(): void
  loader(data: boolean): void
}

declare interface ILottoFavoriteRouteProps {
  selectedLottoGame: ILottoGame
  lottoSlug: TLottoSlug
  betList: ILottoNumber[]
}