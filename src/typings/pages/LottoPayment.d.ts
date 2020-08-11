declare interface ILottoPaymentProps {
    makingBetLottoIsFetching: boolean
    makingBetLottoError: string
    makingBetLottoCode: number | string
    makingBetLottoResult: IBet[]
    betRates: IBetRate[]
}

declare interface ILottoPaymentActionProps {
    getBetRate(): void
    loader(state: boolean): void
    makingBetLotto(data: ILottoNumber[]): void
}

declare interface ILottoPaymentRouteProps {
    selectedLottoGame: IYeegeGame
    lottoSlug: TLottoSlug
    betList: ILottoNumber[]
}

declare interface ILottoPaymentState {
    lottoNumbers: ILottoNumber[]
}

declare interface ILottoPaymentSummaryProps {
    betRates: IBetRate[]
    lottoList: ILottoNumber[]
    onNavigateToFavorite?(): void
    onClickBet(data: ILottoNumber[]): void
    onBetListChanged?(data: ILottoNumber[]): void
}

declare interface ILottoPaymentSummaryState {
    betList: ILottoNumber[]
    defaultValue: string
}