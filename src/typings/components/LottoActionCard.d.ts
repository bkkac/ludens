declare interface IClosedTimeBadge {
  status?: TLottoAvailableStatus
  text?: string
}

declare interface ILottoActionCard {
  name?: string
  status?: TLottoAvailableStatus
  countdownTime?: string
  rangeTimeLabel?: string
  rangeTime?: string
  icon?: string | IIconSet
  onClick?(): void
}