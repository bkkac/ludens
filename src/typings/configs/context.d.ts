declare type TThemeMode = | 'light-mode' | 'dark-mode'

declare interface IThemeContext {
  mode: TThemeMode
  changeMode(mode: TThemeMode): void
}

declare interface IWalletContext {
  shown: boolean
  changeShown(show: boolean): void
}

declare interface ILudensContext {
  theme: IThemeContext
  wallet: IWalletContext
}