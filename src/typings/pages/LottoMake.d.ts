declare type TMakeLottoGameMode = | 'LOTTO' | 'GAME'

declare interface IMakingLottoRouteProps {
  selectedLottoGame: IYeegeGame
  betList?: ILottoNumber[]
}

declare interface IMakingLottoProps {
  makingBetLottoIsFetching: boolean
  makingBetLottoError: string
  makingBetLottoCode: number | string
  makingBetLottoResult: IBet[]
  playYeegeIsFetching: boolean
  playYeegeError: string
  playYeegeCode: number | string
  playYeegeResult: IYeegePlay
  getYeegeSumIsFetching: boolean
  getYeegeSumError: string
  getYeegeSumCode: number | string
  yeegeSum: string
  getPlayedYeegeListIsFetching: boolean
  getPlayedYeegeListError: string
  getPlayedYeegeListCode: number | string
  playedYeegeList: IYeegePlay[]
  getBetResultIsFetching: boolean
  getBetResultError: string
  getBetResultCode: number | string
  betResults: IBetResult[]
  betRates: IBetRate[]
}

declare interface IMakingLottoActionProps {
  getBetRate(): void
  getPlayedYeegeList(data: IGetYeegeSum): void
  listenPlayedYeegeList(data: IGetYeegeSum): void
  unlistenPlayedYeegeList(data: IGetYeegeSum): void
  makingBetLotto(data: ILottoNumber[]): void
  getYeegeSum(data: IGetYeegeSum): void
  listenYeegeSum(data: IGetYeegeSum): void
  unlistenYeegeSum(data: IGetYeegeSum): void
  getBetResult(data: IBetResultRequest): void
  playYeege(data: IYeegePlayRequest): void
  loader(state: boolean): void
  clearBetResult(): void
  clearYeegeSum(): void
}

declare interface IMakingLottoState {
  activeModeSwitch: TMakeLottoGameMode
  numberList: ILottoNumber[]
  defaultGameValue: string
  remainingTime: {
    hours: number
    minutes: number
    seconds: number
  }
  lottoStatus: TGameStatus
}

declare interface IMakingLottoComponentProps {
  betRates: IBetRate[]
  gameSlug: TLottoSlug
  onAddedNumber(lottoNumber: ILottoNumber): void
}

declare interface IMakingLottoComponentState {
  animated: boolean
  numberSet: string
  gameType: TLottoGameType
}

declare interface IMakingGameComponentProps {
  yeegeSum: string
  playedYeegeList: IYeegePlay[]
  onClickAddNumber(gameNumber: string): void
}

declare interface IMakingGameComponentState {
  numberSet: string
  collapseState: boolean
}
