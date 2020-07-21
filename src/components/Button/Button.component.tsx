import React, { SFC } from 'react'
import { noop } from 'lodash' // Temporary
import './button.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButton = {
  id: '',
  text: '',
  onClick() { noop() },
  type: 'normal',
  size: 'medium',
  disabled: false,
  buttonType: 'button',
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
  } = props

  const containerClass = `col px-2 button-container ${type} ${size} ${disabled ? 'disabled' : ''}`

  return (
    <button
      id={id}
      type={buttonType}
      className={containerClass}
      onClick={disabled ? noop : onClick}
    >
      <div className="button-text p1-x"><h4>{text}</h4></div>
    </button>
  )
}

Button.defaultProps = defaultProps

export default Button