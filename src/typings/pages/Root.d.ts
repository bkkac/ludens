declare interface IRootProps {
  accessToken: string
  wallet: IWallet
}

declare interface IRootActionProps {
  loader(state: boolean): void
  connectSocket(): void
}

declare interface IRootStates {
  themeMode: 'dark-mode' | 'light-mode' | string
  isShownWallet: boolean
}