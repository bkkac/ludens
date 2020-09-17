declare interface IButtonRadio {
    id: string
    text: string | JSX.Element
    defaultState?: boolean
    forceState?: boolean
    color?: string
    paddingX?: number
    paddingY?: number
    backgroundColor?: string
    stylename?: 'normal' | 'outline'
    onChangeState?(state: boolean): void
}
