declare interface IRootProps {
  textRunning: string
  accessToken: string
  wallet: IWallet
}

declare interface IRootActionProps {
  loader(state: boolean): void
  connectSocket(): void
  logout?(): void
  getMeConfig(): void
}

declare interface IRootStates {
  themeMode: TThemeMode
  isShownWallet: boolean
  isOpenDrawer: boolean
}