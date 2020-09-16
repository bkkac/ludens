import React, { FC, useState, useEffect } from 'react'
import { noop } from 'lodash'
import colors from 'constants/colors'
import './buttonRadio.style.scss'

const defaultProps: IButtonRadio = {
	id: '',
	text: '',
	stylename: 'normal',
	defaultState: false,
	color: colors.PRIMARY_TEXT,
	backgroundColor: colors.PRIMARY_RED,
	onChangeState() { noop() },
}

const ButtonRadioComponent: FC<IButtonRadio> = ({
	id,
	text,
	stylename,
	color,
	forceState,
	paddingX,
	paddingY,
	defaultState,
	backgroundColor,
	onChangeState,
}) => {

	const [state, setState] = useState<boolean>(defaultState!)

	useEffect(() => {
		if (typeof forceState !== 'undefined') {
			setState(forceState)
		}
	}, [forceState])

	const handleOnStateChange = () => {
		const stateHandler = !state
		setState(stateHandler)
		onChangeState!(stateHandler)
	}

	const isForceState = (typeof forceState !== 'undefined')
	const usedState = isForceState ? forceState : state

	const isFixedPaddingX = (typeof paddingX === 'number')
	const isFixedPaddingY = (typeof paddingY === 'number')
	return (
		<div
			id={id}
			className="button-radio-container m-auto text-center p4-x"
			style={{
				backgroundColor: usedState
					? (stylename === 'outline')
						? 'transparent'
						: backgroundColor
					: 'transparent',
				color: (stylename === 'outline')
					? usedState ? backgroundColor : color
					: usedState ? color : backgroundColor,
				borderColor: (stylename === 'outline')
					? usedState ? backgroundColor : 'transparent'
					: backgroundColor,
				paddingLeft: isFixedPaddingX ? paddingX : 'unset',
				paddingRight: isFixedPaddingX ? paddingX : 'unset',
				paddingTop: isFixedPaddingY ? paddingY : 'unset',
				paddingBottom: isFixedPaddingY ? paddingY : 'unset',
				flex: isFixedPaddingX ? 'unset' : 1,
			}}
			onClick={handleOnStateChange}
		>
			{text}
		</div >
	)
}

ButtonRadioComponent.defaultProps = defaultProps

export default ButtonRadioComponent