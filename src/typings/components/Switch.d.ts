declare interface ISwitchItem<T = string>{
  label: string
  value: T
}

declare interface ISwitchProps {
  type?: 'outline' | 'fill'
  tabs: ISwitchItem[]
  defaultValue?: stirng
  handleOnChangeTab?(currentTab: string): void
}