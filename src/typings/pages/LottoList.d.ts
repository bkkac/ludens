declare interface ILottoListProps {
    getLottoScheduleIsFetching: boolean
    getLottoScheduleCode: number | string
    getLottoScheduleError: string
    lottoSchedule: ILottoSchedule[]
}

declare interface ILottoListActionProps {
    loader(state: boolean): void
    getLottoSchedule(): void
}