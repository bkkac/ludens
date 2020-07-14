declare interface IAffilateProps {
    getAffilateSummaryIsFetching: boolean
    getAffilateSummaryResult: IAffilateSummary
    getAffilateSummaryCode: number | string
    getAffilateSummaryError: string

    getAffilateMemberIsFetching: boolean
    getAffilateMemberResult: IAffilateMember[]
    getAffilateMemberCode: number | string
    getAffilateMemberError: string

    affilateUuid: string
}

declare interface IAffilateActionProps {
    loader(state: boolean): void
    getAffilateSummary(): void
    getAffilateMember(date: string): void
}