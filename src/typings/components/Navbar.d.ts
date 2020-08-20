declare interface INavbarProps {
  mode?: TThemeMode
  isDisplayWallet?: boolean
  onPressesMenu?(): void
  isAuthorized?: boolean
  wallet?: IWallet
}