declare type LottoGameMode = | 'two' | 'three' | 'run'

declare interface IMakingLottoParam {

}

declare interface IMakingLottoProps {

}

declare interface IMakingLottoState {
  activeModeSwitch: string
  activeLottoGameModeSwitch: LottoGameMode
}