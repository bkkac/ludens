declare interface ILoginState {
  isFetching?: boolean
  data?: { token: string }
  error?: string
  code?: number | string
}

declare interface IAuthState {
  login: ILoginState
  logout: ReducerState
}