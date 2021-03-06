declare interface IHomeProps {
  getLottoIsFetching: boolean
  getLottoError: string
  getLottoCode: number | string
  lottoList: ILotto[]

  loginIsFetching: boolean
  loginError: string
  loginCode: number | string
  loginResult: any
}

declare interface IHomeActionProps {
  getLottoList(): void
  login(data: ILoginRequest): void
  loader(data: boolean): void
}

declare interface ILoginFormProps {
  onNavigateToRegister?(): viod
  onNavigateToForgotPassword?(): viod
}

declare interface ILottoProps {
  data: ReadonlyArray<ILotto>
}
