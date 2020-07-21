declare interface IRegisterRequest {
  username: string
  password: string
  passwordConfirm: string
  bank: IBank
  phoneNumber: string
  affilateUuid: string | null
}