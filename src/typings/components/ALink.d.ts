declare interface IALink {
  id: string
  fontSize?: number
  bold?: boolean
  color?: string
  disabled?: boolean
  underline?: boolean
  onClick?(): Void
}