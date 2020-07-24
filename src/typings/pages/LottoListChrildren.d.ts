declare interface ILottoListChrildrenProps {
  getYeegeGameListIsFetching: boolean
  getYeegeGameListError: string
  getYeegeGameListCode: number | string
  yeegeGameList: IYeegeGame[]
}

declare interface ILottoListChrildrenActionProps {
  getYeegeGameList(): void
  loader(state: boolean): void
}
