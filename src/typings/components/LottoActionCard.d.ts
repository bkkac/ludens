type LottoStatus = 'active' | 'available' | 'unavailable'

declare interface IClosedTimeBadge {
  status?: LottoStatus
  text?: string
}

declare interface ILottoActionCard {
  name?: string
  status?: LottoStatus
  countdownTime?: string
  rangeTimeLabel?: string
  rangeTime?: string
  icon?: string | IIconSet
  onClick?(): void
}