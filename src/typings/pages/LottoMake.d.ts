declare type TMakeLottoGameMode = | 'LOTTO' | 'GAME'

declare interface IMakingLottoRouteProps {
  selectedLottoGame: ILottoGame
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
  getLottoGameIsFetching: boolean
  getLottoGameCode: number | string
  getLottoGameError: string
  lottoGame: ILottoGame
  getBetNumberRateIsFetching: boolean
  getBetNumberRateCode: number | string
  getBetNumberRateError: string
  betRateNumbers: (IBetNumberRateRequest & { rate: string })[]
}

declare interface IMakingLottoActionProps {
  getBetRate(): void
  getLottoGame(slugname: TLottoSlug, date: string, round: string)
  getPlayedYeegeList(query: ILottoRoundQuery): void
  listenPlayedYeegeList(query: ILottoRoundQuery): void
  unlistenPlayedYeegeList(query: ILottoRoundQuery): void
  makingBetLotto(data: ILottoNumber[]): void
  getYeegeSum(query: ILottoRoundQuery): void
  listenYeegeSum(query: ILottoRoundQuery): void
  unlistenYeegeSum(query: ILottoRoundQuery): void
  getBetResult(data: IBetResultRequest): void
  playYeege(data: IYeegePlayRequest): void
  loader(state: boolean): void
  clearBetResult(): void
  getBetNumberRate(numbers: IBetNumberRateRequest[]): void
}

declare interface IMakingLottoState {
  activeModeSwitch: TMakeLottoGameMode
  numberList: ILottoNumber[]
  temporaryNumberList: {
    filter: ILottoNumber[],
    adding: ILottoNumber[],
  }
  defaultGameValue: string
  remainingTime: {
    hours: number
    minutes: number
    seconds: number
  }
  lottoStatus: TGameStatus
  onLottoProcessing: boolean
}

declare interface IMakingLottoComponentProps {
  lottos: ILottoNumber[]
  betRates: IBetRate[]
  gameSlug: TLottoSlug
  onAddedNumber(lottoNumber: ILottoNumber | ILottoNumber[], state: 'ADD' | 'REMOVE', isSwitchedNumber: boolean): void
}

declare interface IMakingLottoComponentState {
  animated: boolean
  numberSet: string
  gameType: TLottoGameType
  isSwitchedNumber: boolean
  inputMode: 'NUMBERPAD' | 'NUMBERSET'
}

declare interface IMakingGameComponentProps {
  onClickAddNumber(gameNumber: string): void
}

declare interface IMakingGameComponentState {
  numberSet: string
  collapseState: boolean
}

declare interface IBetResultComponentProps {
  results: IBetResult[]
}

declare interface IPlayedUsers {
  playedYeegeList: IYeegePlay[]
}

declare interface NumbersetsProps {
  gameMode: TLottoGameType
  lottos: ReadonlyArray<ILottoNumber>
  onAddedNumber(lottoNumber: ILottoNumber | ILottoNumber[], state: 'ADD' | 'REMOVE'): void
}

declare interface NumbersetsState {
  gameNumberLength: number
  currentNumberIndex: number
  maxNumber: number
  selectedIndexFrontNumbers: boolean[]
}