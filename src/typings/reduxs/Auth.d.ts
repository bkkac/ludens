declare interface ILoginState {
  isFetching?: boolean
  data?: any
  error?: string
  code?: number | string
}

declare interface IAuthState {
  login: ILoginState
}