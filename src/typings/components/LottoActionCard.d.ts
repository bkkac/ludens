type LottoStatus = 'active' | 'available' | 'unavailable'

declare interface IClosedTimeBadge {
  status?: LottoStatus
  text?: string
}

declare interface ILottoActionCard {
  name?: string
  status?: LottoStatus
  time?: string
  closedTime?: string
}