declare interface INavbarProps {
  mode?: 'light-mode' | 'dark-mode' | string
  isDisplayWallet?: boolean
  onPressesLogo?(): void
  isAuthorized?: boolean
  wallet?: IWallet
}