declare interface ITransactionListProps {
  user: IUser
  tansactionList: ITransaction[]
  getTransactionListIsFetching: boolean
  getTransactionListCode: number | string
  getTransactionListError: string
}

declare interface ITransactionListActionProps {
  loader(state: boolean): void
  getUser(): void
  getTransactionList(): void
}