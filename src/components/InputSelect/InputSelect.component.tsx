import React, { Component } from 'react'
import { isEmpty, map, noop, find } from 'lodash'
import { SelectorItem } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './inputSelect.style.scss'

const defaultProps: IInputSelectProps = {
	placeholder: 'เลือก',
	value: '',
	name: '',
	onChange() { noop() },
}

class InputSelectComponent<T = string, K = string> extends Component<IInputSelectProps<T, K>, IInputSelectState<T>> {

	static defaultProps = defaultProps

	state: IInputSelectState<T> = {
		selectedValue: '',
		isSelected: false,
		isExpand: false,
	}

	componentDidMount() {
		if (!isEmpty(this.props.value) && typeof this.props.value !== 'undefined') {
			const defalutValue: T | undefined = find<T>(this.props.items, [this.props.valueKey || '', this.props.value])
			this.setState({ isSelected: true, selectedValue: defalutValue || '' })
		}
	}

	handleOpenSelector = () => {
		this.setState({ isExpand: !this.state.isExpand })
	}

	handleOnBlurSelector = () => {
		this.setState({ isExpand: false })
	}

	handleOnClickItem = (item: T) => {
		this.setState({ selectedValue: item, isSelected: true, isExpand: false }, () => {
			this.props.onChange!(item, this.props.name)
		})
	}

	renderDisplaySelectedValues = () => {
		const { placeholder, RenderSelected } = this.props
		const { isSelected, selectedValue } = this.state

		if (isSelected) {
			if (typeof RenderSelected !== 'undefined' && typeof selectedValue !== 'string') {
				return <RenderSelected item={selectedValue} isDisplaying />
			}
			return (<h5 className="secondary-text">{selectedValue}</h5>)
		}

		return (<h4 className="secondary-text">{placeholder}</h4>)
	}

	renderItems = () => {
		const { items, RenderSelected, name } = this.props

		const Items = map(items, (item, index) => {
			const key = `${name}-${index}`
			if (typeof RenderSelected !== 'undefined') {
				return (
					<li onClick={() => this.handleOnClickItem(item)} key={key} id={key}>
						<RenderSelected item={item} />
					</li>
				)
			}
			return (
				<li onClick={() => this.handleOnClickItem(item)} key={key} id={key}>
					<SelectorItem title={String(item) || ''} />
				</li>
			)
		})

		return <>{Items}</>
	}

	render() {
		const { name } = this.props
		const { isExpand } = this.state
		const DisplaySelectedValuesComponent = this.renderDisplaySelectedValues
		const ItemsComponent = this.renderItems
		return (
			<div
				className="input-select-container"
				onBlur={this.handleOnBlurSelector}
				tabIndex={0}
			>
				<ul
					id={name}
					className="selected-wrapper"
					onClick={this.handleOpenSelector}
					onBlur={this.handleOnBlurSelector}
				>
					<li>
						<div className="input-selected-wrapper">
							<DisplaySelectedValuesComponent />
						</div>
						<FontAwesomeIcon
							icon={faChevronRight}
							className={`chevron-right-icon ${this.state.isExpand ? 'expanded' : ''}`}
						/>
					</li>
				</ul>
				<ul className={`selector-wrapper ${isExpand ? 'opened' : ''}`}>
					<ItemsComponent />
				</ul>
			</div>
		)
	}
}

export default InputSelectComponent