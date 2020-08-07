import React, { SFC, useState, useEffect } from 'react'
import { noop } from 'lodash'
import colors from 'constants/colors'
import './buttonRadio.style.scss'

const defaultProps: IButtonRadio = {
	id: '',
	text: '',
	padding: 32,
	stylename: 'normal',
	defaultState: false,
	color: colors.PRIMARY_TEXT,
	backgroundColor: colors.PRIMARY_RED,
	onChangeState() { noop() },
}

const ButtonRadioComponent: SFC<IButtonRadio> = ({
	id,
	text,
	stylename,
	color,
	forceState,
	padding,
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
				paddingLeft: padding,
				paddingRight: padding,
			}}
			onClick={handleOnStateChange}
		>
			{text}
		</div >
	)
}

ButtonRadioComponent.defaultProps = defaultProps

export default ButtonRadioComponent