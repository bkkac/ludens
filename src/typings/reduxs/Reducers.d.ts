declare interface ReducerState<T = any> {
  isFetching?: boolean
  data?: T
  error?: string
  code?: number | string
}

declare interface RootReducers {
  ludens: {
    user: IUserState
    lotto: ILottoState
    otp: IOTPState
    register: IRegisterState
    loader: boolean
    auth: IAuthState
    credit: ICreditState
    bank: IBankState
    socket: ISocketState
  }
}