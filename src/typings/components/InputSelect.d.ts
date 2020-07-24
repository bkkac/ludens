declare interface IInputDefaultSelectProps<T = string> {
	item: T
	isDisplaying?: boolean
	backgroundColor?: string
	backgroundHoverColor?: string
}

declare interface IInputSelectProps<T = string, K = string> {
    name: string
	value: K
    valueKey?: string
	placeholder?: string
	backgroundColor?: string
	backgroundHoverColor?: string
	items?: ReadonlyArray<T>
	onChange?(selected: T, name: string): void
	RenderSelected?(args: IInputDefaultSelectProps<T>): JSX.Element
}

declare interface IInputSelectState<T = string> {
	selectedValue: T | K
	isExpand: boolean
	isSelected: boolean
}
