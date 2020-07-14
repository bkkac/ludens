declare interface IAffilateState {
    summary: ReducerState<IAffilateSummary>
    member: ReducerState<IAffilateMember[]>
}