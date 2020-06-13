declare interface IModalProps {
  event: string
}

declare interface IModalState {
  show: boolean
  extraProps: Object<any>
  RenderComponent: JSX.Element | Element
}

declare interface IModalShowProps {
  state: 'show'
  extraProps?: Object<any>
  component: JSX.Element | Element
}

declare interface IModalHideProps {
  state: 'hide'
  extraProps?: Object<any>
  component?: JSX.Element | Element
}

declare interface ISuccessModal {
  title?: string
  description?: string
  actionText?: string
  action?(): void
}

declare interface IErrorModal {
  title?: string
  description?: string
  actionText?: string
  action?(): void
}
