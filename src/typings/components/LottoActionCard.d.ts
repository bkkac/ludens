declare interface ILottoActionCard {
  id: string
  title: string
  subTitle: string
  isCountingdown?: boolean
  expire?: string
  status?: TGameStatus
  openedStatusText?: string
  waitingStatusText?: string
  closedStatusText?: string
  description?: string
  backgroundColor?: string
  icon?: string | IIconSet
  onClick?(): void
}