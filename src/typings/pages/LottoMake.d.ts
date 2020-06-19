declare type TLottoGameType = | 'LOTTER_YEGEE'
declare type IGamePath = | 'yeege'

declare interface IMakingLottoParam {
  selectedLottoGame: IYeegeGame
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
}

declare interface IMakingLottoActionProps {
  makingBetLotto(data: ILottoNumber[]): void
  getYeegeSum(data: IGetYeegeSum): void
  playYeege(data: IYeegePlayRequest): void
  loader(state: boolean): void
}

declare interface IMakingLottoState {
  activeModeSwitch: string
  numberList: ILottoNumber[]
  defaultGameValue: string
  remainingTime: {
    hours: number
    minutes: number
    seconds: number
  }
  lottoStatus: TLottoAvailableStatus
}

declare interface ISummaryLottoModalProps {
  lottoList: ILottoNumber[]
  onClickBet(data: ILottoNumber[]): void
  onClickClose(data: ILottoNumber[]): void
}

declare interface IMakingLottoComponentProps {
  onClickAddNumber(lottoNumber: ILottoNumber): void
}

declare interface IMakingLottoComponentState {
  numberSet: string
  gameType: TLottoType
}

declare interface IMakingGameComponentProps {
  yeegeSum: string
  onClickAddNumber(gameNumber: string): void
}

declare interface IMakingGameComponentState {
  numberSet: string
}
