declare interface ILottoListChrildrenProps {
  getYeegeGameListIsFetching: boolean
  getYeegeGameListError: string
  getYeegeGameListCode: number | string
  yeegeGameList: ILottoGame[]
}

declare interface ILottoListChrildrenActionProps {
  getYeegeGameList(): void
  loader(state: boolean): void
}
