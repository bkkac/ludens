declare interface IRegisterRequest {
  username: string
  password: string
  password_confirm: string
  bank: {
    type: string
    name: string
    number: string
  }
  phone_number: string
}