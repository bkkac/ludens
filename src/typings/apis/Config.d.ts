declare type TGameMode = | 'MANUAL' | 'AUTOMATIC'
declare type TGameStatus = | 'OPEN' | 'CLOSE' | 'WAIT' | 'UNKNOWN'

declare interface ILottoSchedule {
    id: number
    code: TLottoSlug
    mode: TGameMode
    status: TGameStatus
    startTime: string
    endTime: string
    updatedAt: string
}

declare interface IWebConfig {
    id: number
    textRunner: string
    contactUrl: string
    contactLine: string
    contactPhoneNumber: string
    updatedAt: string
}