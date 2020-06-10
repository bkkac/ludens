declare interface IClosedTimeBadge {
  status?: ILottoStatus
  text?: string
}

declare interface ILottoActionCard {
  name?: string
  status?: ILottoStatus
  countdownTime?: string
  rangeTimeLabel?: string
  rangeTime?: string
  icon?: string | IIconSet
  onClick?(): void
}