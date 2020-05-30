declare interface IGetMeState {
  isFetching?: boolean
  data?: IUser
  error?: string
  code?: number | string
}

declare interface ITokenState {
  accessToken?: string
  refreshToken?: string
}

declare interface IUserState {
  wallet: IWallet
  token: ITokenState
  me: IGetMeState
}