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

declare interface ILottoFavoriteManagementProps {
  getLottoFavoriteListIsFetching: boolean
  getLottoFavoriteListCode: number | string
  getLottoFavoriteListError: string
  lottoFavoriteList: ReadonlyArray<IFavoriteSet>
}

declare interface ILottoFavoriteManagementActionProps {
  getLottoFavoriteList(): void
  loader(data: boolean): void
}

declare interface ILottoFavoriteFormProps {
  getLottoFavoriteIsFetching: boolean
  getLottoFavoriteCode: number | string
  getLottoFavoriteError: string
  favoriteLotto: IFavoriteSet
  addLottoFavoriteTitleIsFetching: boolean
  addLottoFavoriteTitleCode: number | string
  addLottoFavoriteTitleError: string
  addLottoFavoriteTitleResponse: IFavoriteSet
  editLottoFavoriteTitleIsFetching: boolean
  editLottoFavoriteTitleCode: number | string
  editLottoFavoriteTitleError: string
  removeLottoFavoriteTitleIsFetching: boolean
  removeLottoFavoriteTitleCode: number | string
  removeLottoFavoriteTitleError: string
  addLottoFavoriteNumberIsFetching: boolean
  addLottoFavoriteNumberCode: number | string
  addLottoFavoriteNumberError: string
  editLottoFavoriteNumberIsFetching: boolean
  editLottoFavoriteNumberCode: number | string
  editLottoFavoriteNumberError: string
  removeLottoFavoriteNumberIsFetching: boolean
  removeLottoFavoriteNumberCode: number | string
  removeLottoFavoriteNumberError: string
}

declare interface ILottoFavoriteFormActionProps {
  loader(data: boolean): void
  getLottoFavorite(id: number): void
  addLottoFavoriteTitle(title: string): void
  addLottoFavoriteNumber(data: IFavoriteNumberRequest): void
  editLottoFavoriteTitle(id: number, title: string): void
  editLottoFavoriteNumber(data: IFavoriteNumberRequest): void
  removeLottoFavoriteTitle(id: number): void
  removeLottoFavoriteNumber(id: number): void
}

declare interface ILottoFavoriteFormState {
  isDertySet: boolean
  isOnEdit: boolean
  titleName: string
  initialSet: { title: string }
  initialNumber: IFavoriteNumberRequest
  currentNumber: IFavoriteNumberRequest
}