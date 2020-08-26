declare interface ITabItem {
  title: string
  name: string
  path: string
  ActiveIcon: JSX.Element
  InactiveIcon: JSX.Element
  disabled?: boolean
}

declare interface ITabbarProps {
  tabs: ITabItem[]
  mode: TThemeMode
}