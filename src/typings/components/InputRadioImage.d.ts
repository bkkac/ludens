declare interface IInputRadioImgae {
  image: string
  name: string
  alt?: string
  value?: string
  checked: boolean
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}