type ButtonStyle = 'normal' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'

declare interface IButton {
  text: string
  onClick?(): Void
  type?: ButtonStyle
  size?: ButtonSize
}