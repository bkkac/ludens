declare interface INavbarProps {
  mode?: 'light-mode' | 'dark-mode' | string
  isDisplayWallet?: boolean
  onPressesLogo?(): void
  onPressesMenu?(): void
  isAuthorized?: boolean
  wallet?: IWallet
}