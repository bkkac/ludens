declare interface IButtonRadio {
    id: string
    text: string
    defaultState?: boolean
    forceState?: boolean
    color?: string
    padding?: number
    backgroundColor?: string
    stylename?: 'normal' | 'outline'
    onChangeState?(state: boolean): void
}
