declare type TBetType = 'LOTTER_YEGEE_THREE_TOAST' | 'LOTTER_YEGEE_RUN_UP' | 'LOTTER_YEGEE_RUN_DOWN'
    | 'LOTTER_YEGEE_THREE_UP' | 'LOTTER_YEGEE_TWO_DOWN' | 'LOTTER_YEGEE_TWO_UP'

declare interface IBetRate {
    id: number
    type: TBetType
    rate: string
    createdAt: string
    updatedAt: string
}