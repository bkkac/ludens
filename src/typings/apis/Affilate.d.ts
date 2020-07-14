declare interface IAffilateLotto {
    rate: string
    totalBet: string
    affilateIncome: string
}

declare interface IAffilateSummary {
    totalClick?: string
    totalRegistered?: string
    totalIncome?: string
    income?: string
    totalBet?: string
    lotter?: IAffilateLotto
}

declare interface IAffilateMember {
    createdAt?: string
    memberName?: string
    totalBet?: string
    totalLotter?: string
    totalGame?: string
}