declare interface IModalState {
  show: boolean
  RenderComponent: JSX.Element | Element
}

declare interface IModalShowProps {
  state: 'show'
  component: JSX.Element | Element
}

declare interface IModalHideProps {
  state: 'hide'
  component?: JSX.Element | Element
}

declare interface ISuccessModal {
  title?: string
  description?: string
  actionText?: string
  action?(): void
}
