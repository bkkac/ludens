declare interface ISubLottoProps {
  getYeegeGameListIsFetching: boolean
  getYeegeGameListError: string
  getYeegeGameListCode: number | string
  yeegeGameList: IYeegeGame[]
}

declare interface ISubLottoActionProps {
  getYeegeGameList(): void
  loader(state: boolean): void
}

declare interface ISubLottoState {
}