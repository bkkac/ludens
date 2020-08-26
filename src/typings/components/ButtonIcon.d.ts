declare type IButtonIconType = | 'close' | 'custom'

declare interface IButtonIcon {
  id: string
  type: IButtonIconType
  onClick?(): void
  CustomIcon?: JSX.Element
}