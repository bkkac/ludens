declare type TLottoGameType =
  | 'TWO_UP'
  | 'TWO_DOWN'
  | 'THREE_UP'
  | 'THREE_FRONT'
  | 'THREE_BACK'
  | 'THREE_TOAST'
  | 'FOUR_SUIT'
  | 'RUN_UP'
  | 'RUN_DOWN'
  | 'ONE_AWARD'
  | 'YEGEE_PLAY_AWARD'

declare type TLottoType =
  | 'GOVN'
  | 'BAAC'
  | 'BAAC'
  | 'GSB'
  | 'LAO'
  | 'TH_SHARE_MORNING'
  | 'TH_SHARE_MIDDAY'
  | 'TH_SHARE_AFTERNOON'
  | 'TH_SHARE_EVENING'
  | 'NAT_SHARE_DOWNJON'
  | 'NAT_SHARE_EGYPT'
  | 'NAT_SHARE_GERMANY'
  | 'NAT_SHARE_NIKAII_MORNING'
  | 'NAT_SHARE_NIKAII_AFTERNOON'
  | 'NAT_SHARE_CHINA_MORNING'
  | 'NAT_SHARE_CHINA_AFTERNOON'
  | 'NAT_SHARE_TAIWAN'
  | 'NAT_SHARE_KOREA'
  | 'NAT_SHARE_SINGAPORE'
  | 'NAT_SHARE_INDIA'
  | 'NAT_SHARE_HANOI_SPECIAL'
  | 'NAT_SHARE_MALAY'
  | 'NAT_SHARE_VIETNAM_HANOI'
  | 'NAT_SHARE_VIETNAM_HANOI_VIP'
  | 'NAT_SHARE_HANOI_4D'
  | 'NAT_SHARE_RUSSIA'
  | 'NAT_SHARE_ENGLISH'
  | 'NAT_SHARE_HUNGSENG_MORNING'
  | 'NAT_SHARE_HUNGSENG_AFTERNOON'
  | 'NAT_SHARE_LAO'
  | 'YEGEE'

declare type TLottoSlug =
  | 'LOTTER_YEGEE'
  | 'LOTTER_GOVN'
  | 'LOTTER_BAAC'
  | 'LOTTER_GSB'
  | 'LOTTER_LAO_SUITE'
  | 'LOTTER_TH_SHARE_MORNING'
  | 'LOTTER_TH_SHARE_MIDDAY'
  | 'LOTTER_TH_SHARE_AFTERNOON'
  | 'LOTTER_TH_SHARE_EVENING'
  | 'LOTTER_NAT_SHARE_DOWNJON'
  | 'LOTTER_NAT_SHARE_EGYPT'
  | 'LOTTER_NAT_SHARE_GERMANY'
  | 'LOTTER_NAT_SHARE_NIKAII_MORNING'
  | 'LOTTER_NAT_SHARE_NIKAII_AFTERNOON'
  | 'LOTTER_NAT_SHARE_CHINA_MORNING'
  | 'LOTTER_NAT_SHARE_CHINA_AFTERNOON'
  | 'LOTTER_NAT_SHARE_TAIWAN'
  | 'LOTTER_NAT_SHARE_KOREA'
  | 'LOTTER_NAT_SHARE_SINGAPORE'
  | 'LOTTER_NAT_SHARE_INDIA'
  | 'LOTTER_NAT_SHARE_HANOI_SPECIAL'
  | 'LOTTER_NAT_SHARE_MALAY'
  | 'LOTTER_NAT_SHARE_VIETNAM_HANOI'
  | 'LOTTER_NAT_SHARE_VIETNAM_HANOI_VIP'
  | 'LOTTER_NAT_SHARE_HANOI_4D'
  | 'LOTTER_NAT_SHARE_RUSSIA'
  | 'LOTTER_NAT_SHARE_ENGLISH'
  | 'LOTTER_NAT_SHARE_HUNGSENG_MORNING'
  | 'LOTTER_NAT_SHARE_HUNGSENG_AFTERNOON'

declare interface ILottoResult {
  type: TLottoGameType
  numbers: string
}

declare interface ILotto {
  code: TLottoType
  createdAt: string
  lotto: ReadonlyArray<ILottoResult>
}

declare interface IYeegeGame {
  id: number
  round: string
  endTime: string
  startTime: string
  createdAt: string
  status: TGameStatus
}

declare interface ILottoNumber {
  number: string
  type: TLottoGameType
  value?: string
  slug?: string
}

declare interface IGetYeegeSum {
  date: string
  round: string
}

declare interface IYeegePlayRequest {
  number: string
  round: string
}

declare interface IBetResultRequest {
  date: string
  type: string
  round: string
}

declare interface IYeegePlay {
  id?: number
  number?: number
  round?: string
  createdAt?: string
  userId?: IUser
}

declare interface IBet {
  id?: number
  userId: number
  number: string
  type: TLot
  value?: string
  result: string
  status: TBetStatus
  slug?: string
  createdAt: string
  updatedAt: string
}

declare interface IBetResult {
  id: string
  value: string
  valueType: TLottoGameType
  slug: string
  createdAt: string
}