declare interface IWithdrawProps {
}

declare interface IWithdrawActionProps {
}

declare interface IWithdrawStates {
}

declare interface IWithdrawFormProps<T = any> {
  onCancelPresses?(): void,
  onBackPresses?(): void
  extraProps?: T
}
