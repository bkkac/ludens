declare interface IButtonMenu {
  id: string
  icon?: string | IIconSet
  text: string
  onClick?(): void
}