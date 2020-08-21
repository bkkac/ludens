declare interface ITabItem {
  title: string
  name: string
  path: string
  Icon: JSX.Element
  disabled?: boolean
}

declare interface ITabbarProps {
  tabs: ITabItem[]
  mode: TThemeMode
}