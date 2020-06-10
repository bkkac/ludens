declare interface ITransactionItem {
  type: string
  status: string
  time: string
  money: number
  containerClassName?: string
  onClick?(): void
}