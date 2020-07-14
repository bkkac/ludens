import React, { SFC } from 'react'
import { InputText } from 'components'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import './inputTextIcon.style.scss'

const InputTextIcon: SFC<IInputTextProps & FontAwesomeIconProps> = ({ icon, ...inputProps }) => {

    return (
        <div className="input-text-icon-container">
            <div className="fontawesome-wrapper">
                <FontAwesomeIcon icon={icon} className="input-text-icon" />
            </div>
            <div className="flex">
                <InputText {...inputProps} />
            </div>
        </div>
    )
}

export default InputTextIcon