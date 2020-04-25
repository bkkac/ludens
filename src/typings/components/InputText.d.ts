declare interface IInputProps {
  name?: string
  error?: boolean
  icon?: string
  type?: string
  placeholder?: string
  value?: string
  errorMessage?: string
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
  useNumberpad?: boolean
}