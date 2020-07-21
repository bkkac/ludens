declare type IButtonIconType = | 'close' | 'custom'

declare interface IButtonIcon {
  id: string
  type: IButtonIconType
  onClick?(): void
  customIcon?: string | IIconSet
}