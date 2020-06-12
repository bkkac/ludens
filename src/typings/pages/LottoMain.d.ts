declare interface IMainLottoProps {
  user: IUser
  wallet: IWallet
}

declare interface IMainLottoActionProps {
  loader(state: boolean): void
}

declare interface IMainLottoState {
}