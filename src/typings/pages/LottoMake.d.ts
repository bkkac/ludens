declare type ILottoType = | 'THREE_UP' | 'THREE_TOAST' | 'TWO_UP' | 'TWO_DOWN' | 'RUN_UP' | 'RUN_DOWN'
declare type ILottoGameType = | 'LOTTER_YEGEE'
declare type IGamePath = | 'yeege'

declare interface IMakingLottoParam {
  selectedLottoGame: IYeegeGame
}

declare interface IMakingLottoProps {
  makingBetLottoIsFetching: boolean
  makingBetLottoError: string
  makingBetLottoCode: number | string
  makingBetLottoResult: ILottoNumberBet[]
}

declare interface IMakingLottoActionProps {
  makingBetLotto(data: ILottoNumber[]): void
  loader(state: boolean): void
}

declare interface IMakingLottoState {
  activeModeSwitch: string
  activeLottoGameModeSwitch: ILottoType
  numberList: ILottoNumber[]
  defaultGameValue: string
}

declare interface ISummaryLottoModalProps {
  lottoList: ILottoNumber[]
  onClickBet(data: ILottoNumber[]): void
  onClickClose(data: ILottoNumber[]): void
}