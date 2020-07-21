import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import './selectorItem.style.scss'

const defaultProps: ISelectorItemProps = {
	title: '',
	subTitle: '',
	isDisplaying: false,
}

const SelectorItemComponent: SFC<ISelectorItemProps> = ({
	icon,
	title,
	subTitle,
	isDisplaying,
}) => {

	return (
		<div className={`selector-item-container ${isDisplaying ? 'displaying' : ''}`}>
			<ResponsiveIcon icon={icon!} alt="selector-icon" className="selector-icon-wrapper" />
			<div className="selector-text-wrapper">
				<h5>{title}</h5>
				{subTitle ? (<h6 className="secondary-text">{subTitle}</h6>) : <></>}
			</div>
		</div>
	)
}

SelectorItemComponent.defaultProps = defaultProps

export default SelectorItemComponent