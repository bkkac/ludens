declare interface IButtonRadioGroup {
  id: string
  dataset: any[]
  forceSelectedData?: boolean[]
  onChange?(selectedList: any[], currentChange: any, state: boolean): void
}
