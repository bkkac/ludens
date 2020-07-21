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
    register: ReducerState<any>
    loader: boolean
    auth: IAuthState
    finance: IFinanceState
    bank: IBankState
    credit: ICreditState
    socket: ISocketState
    affilate: IAffilateState
  }
}