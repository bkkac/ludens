declare interface ICreditInfoProps {
  wallet: IWallet
  creditInfo: ICredit[]
  getCreditInfoListIsFetching: boolean
  getCreditInfoListCode: number | string
  getCreditInfoListError: string
}

declare interface ICreditInfoActionProps {
  loader(state: boolean): void
  getUser(): void
  getCreditInfoList(): void
}