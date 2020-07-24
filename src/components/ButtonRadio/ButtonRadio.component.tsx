import React, { SFC, useState } from 'react'
import { noop } from 'lodash'
import colors from 'constants/colors'
import './buttonRadio.style.scss'

const defaultProps: IButtonRadio = {
    id: '',
    text: '',
    defaultState: false,
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.PRIMARY_RED,
    onChangeState() { noop() },
}

const ButtonRadioComponent: SFC<IButtonRadio> = ({
    id,
    text,
    color,
    defaultState,
    backgroundColor,
    onChangeState,
}) => {

    const [state, setState] = useState<boolean>(defaultState!)

    const handleOnStateChange = () => {
        const stateHandler = !state
        setState(stateHandler)
        onChangeState!(stateHandler)
    }

    return (
        <div
            id={id}
            className="button-radio-container m-auto text-center p4-x"
            style={{
                backgroundColor: state ? backgroundColor : 'transparent',
                color: state ? color : backgroundColor,
                borderColor: backgroundColor,
            }}
            onClick={handleOnStateChange}
        >
            {text}
        </div>
    )
}

ButtonRadioComponent.defaultProps = defaultProps

export default ButtonRadioComponent