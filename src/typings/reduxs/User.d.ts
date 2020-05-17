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
  token: ITokenState
  me: IGetMeState
}