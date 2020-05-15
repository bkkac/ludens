declare interface IGetMeState {
  isFetching?: boolean
  data?: any
  error?: string
  code?: number | string
}

declare interface ITokenState {
  accessToken?: string
  refreshToken?: string
}

declare interface IUserState {
  token: ITokenState
  me: IGetMeState
}