declare interface IInputCheckbox {
  name: string
  label: string
  value?: boolean
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}