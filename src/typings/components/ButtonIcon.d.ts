declare type IButtonIconType = | 'close' | 'custom'

declare interface IButtonIcon {
  type: IButtonIconType
  onClick?(): void
  customIcon?: string | IIconSet
}