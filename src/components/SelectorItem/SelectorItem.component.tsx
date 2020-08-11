import React, { SFC, useState } from 'react'
import colors from 'constants/colors'
import { ResponsiveIcon } from 'components'
import './selectorItem.style.scss'

const defaultProps: ISelectorItemProps = {
	title: '',
	subTitle: '',
	isSelected: false,
	isDisplaying: false,
	backgroundColor: colors.SECONDARY_BG,
	backgroundHoverColor: colors.PRIMARY_BG,
}

const SelectorItemComponent: SFC<ISelectorItemProps> = ({
	icon,
	title,
	subTitle,
	isSelected,
	isDisplaying,
	backgroundColor,
	backgroundHoverColor,
}) => {

	const baseBackgroundColor = isSelected ? backgroundHoverColor : backgroundColor

	const [hoverColor, setHoverColor] = useState(baseBackgroundColor)

	const handleOnMouseOver = () => {
		if (!isDisplaying) {
			setHoverColor(backgroundHoverColor)
		}
	}

	const handleOnMouseLeave = () => {
		setHoverColor(baseBackgroundColor)
	}

	return (
		<div
			className={`selector-item-container ${isSelected ? 'selected' : ''} ${isDisplaying ? 'displaying' : ''}`}
			style={{ backgroundColor: hoverColor }}
			onMouseLeave={handleOnMouseLeave}
			onMouseOver={handleOnMouseOver}
		>
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