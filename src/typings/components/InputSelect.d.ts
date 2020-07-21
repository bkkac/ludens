declare interface IInputDefaultSelectProps<T = string> {
	item: T
	isDisplaying?: boolean
}

declare interface IInputSelectProps<T = string, K = string> {
    name: string
	value: K
    valueKey?: string
	placeholder?: string
	items?: ReadonlyArray<T>
	onChange?(selected: T, name: string): void
	RenderSelected?(args: IInputDefaultSelectProps<T>): JSX.Element
}

declare interface IInputSelectState<T = string> {
	selectedValue: T | string
	isExpand: boolean
	isSelected: boolean
}
