declare interface ILoginState {
  isFetching?: boolean
  data?: string
  error?: string
  code?: number | string
}

declare interface IAuthState {
  login: ILoginState
}