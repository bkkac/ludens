declare interface RootReducers {
  ludens: {
    user: IUserState
    lotto: ILottoState
    otp: IOTPState
    register: IRegisterState
    loader: boolean
    auth: IAuthState
    credit: ICreditState
  }
}