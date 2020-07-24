declare interface IButtonRadio {
    id: string
    text: string
    defaultState?: boolean
    color?: string
    backgroundColor?: string
    onChangeState?(state: boolean): void
}
