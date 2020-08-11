type ButtonStyle = 'normal' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'submit' | 'reset' | 'button'

declare interface IButton {
  id: string
  text: string
  onClick?(): Void
  type?: ButtonStyle
  size?: ButtonSize
  disabled?: boolean
  buttonType?: ButtonType
  backgroundColor?: string
  backgroundHoverColor?: string
}