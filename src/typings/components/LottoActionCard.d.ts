declare interface ILottoActionCard {
  title: string
  subTitle: string
  isCountingdown?: boolean
  expire?: string
  status?: TGameStatus
  openedStatusText?: string
  closedStatusText?: string
  description?: string
  backgroundColor?: string
  icon?: string | IIconSet
  onClick?(): void
}