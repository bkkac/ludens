import React, { SFC, useState } from 'react'
import { noop } from 'lodash' // Temporary
import './button.style.scss'
import colors from 'constants/colors'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButton = {
  id: '',
  text: '',
  onClick() { noop() },
  type: 'normal',
  size: 'medium',
  disabled: false,
  buttonType: 'button',
  backgroundColor: colors.PRIMARY_BLUE,
  backgroundHoverColor: colors.SECONDARY_BLUE,
}

const Button: SFC<IButton & DefaultProps> = (props) => {

  const {
    id,
    text,
    onClick,
    type,
    size,
    disabled,
    buttonType,
    backgroundColor,
    backgroundHoverColor,
  } = props

  const containerClass = `col px-2 button-container ${type} ${size} ${disabled ? 'disabled' : ''}`

  const [hoverColor, setHoverColor] = useState(backgroundColor)

  const handleOnMouseOver = () => {
    setHoverColor(backgroundHoverColor)
  }

  const handleOnMouseLeave = () => {
    setHoverColor(backgroundColor)
  }


  return (
    <button
      onMouseLeave={handleOnMouseLeave}
      onMouseOver={handleOnMouseOver}
      id={id}
      type={buttonType}
      style={{ backgroundColor: hoverColor }}
      className={containerClass}
      onClick={disabled ? noop : onClick}
    >
      <div className="button-text p1-x"><h4>{text}</h4></div>
    </button>
  )
}

Button.defaultProps = defaultProps

export default Button