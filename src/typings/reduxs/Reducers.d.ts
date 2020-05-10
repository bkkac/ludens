declare interface RootReducers {
  ludens: {
    lotto: ILottoState
    otp: IOTPState
    register: IRegisterState
    loader: boolean
    auth: IAuthState
    credit: ICreditState
  }
}