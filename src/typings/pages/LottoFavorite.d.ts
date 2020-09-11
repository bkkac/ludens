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
  addLottoFavoriteIsFetching: boolean
  addLottoFavoriteCode: number | string
  addLottoFavoriteError: string
  editLottoFavoriteIsFetching: boolean
  editLottoFavoriteCode: number | string
  editLottoFavoriteError: string
}

declare interface ILottoFavoriteFormActionProps {
  loader(data: boolean): void
  addLottoFavorite(): void
  editLottoFavorite(): void
}

declare interface ILottoFavoriteFormState {
  isDertySet: boolean
  initialSet: { title: string },
  initialNumber: IFavoriteNumberRequest,
}