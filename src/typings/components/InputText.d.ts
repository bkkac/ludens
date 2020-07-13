declare interface IInputTextProps {
  name?: string
  error?: boolean
  type?: string
  disabled?: boolean
  placeholder?: string
  value?: string
  errorMessage?: string
  hiddenErrorBlock?: boolean
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
  useNumberpad?: boolean
}