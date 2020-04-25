declare interface IIconSet {
  x1: string
  x2: string
  x3: string
}

declare interface IResponsiveIcon {
  icon: string | IIconSet
  className?: string
  alt?: string
}