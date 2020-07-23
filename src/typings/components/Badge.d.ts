declare interface IBadge {
  text: string
  renderText?(): JSX.Element
  icon?: string | IIconSet
  color?: string
  backgroundColor?: string
}

declare interface IBadge {
  text?: string
  renderText(): JSX.Element
  icon?: string | IIconSet
  color?: string
  backgroundColor?: string
}