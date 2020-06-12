declare interface ISubLottoProps {
  getYeegeGameListIsFetching: boolean
  getYeegeGameListError: string
  getYeegeGameListCode: number | string
  yeegeGameList: IYeegeGame[]
  user: IUser
  wallet: IWallet
}

declare interface ISubLottoActionProps {
  getYeegeGameList(): void
  loader(state: boolean): void
}

declare interface ISubLottoState {
}