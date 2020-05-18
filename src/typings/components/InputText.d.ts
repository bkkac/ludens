declare interface IInputTextProps {
  name?: string
  error?: boolean
  icon?: string
  type?: string
  disabled?: boolean
  placeholder?: string
  value?: string
  errorMessage?: string
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
  useNumberpad?: boolean
}