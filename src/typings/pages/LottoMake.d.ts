declare type ILottoType = | 'THREE_UP' | 'THREE_TOAST' | 'TWO_UP' | 'TWO_DOWN' | 'RUN_UP' | 'RUN_DOWN'
declare type ILottoGameType = | 'LOTTER_YEGEE'
declare type IGamePath = | 'yeege'

declare interface IMakingLottoParam {
  selectedLottoGame: IYeegeGame
}

declare interface IMakingLottoProps {
}

declare interface IMakingLottoState {
  activeModeSwitch: string
  activeLottoGameModeSwitch: ILottoType
  numberList: ILottoNumber[]
  defaultGameValue: string
}

declare interface ILottoNumber {
  number: string,
  type: ILottoType,
  value?: string,
  slug?: string
}

declare interface ISummaryLottoModalProps {
  lottoList: ILottoNumber[]
}