import React, { SFC } from 'react'
import { noop } from 'lodash' // Temporary
import './button.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButton = {
  text: '',
  onClick() { noop() },
  type: 'normal',
  size: 'medium',
}

const Button: SFC<IButton & DefaultProps> = (props) => {

  const {
    text,
    onClick,
    type,
    size,
  } = props

  const containerClass = `col px-2 button-container ${type} ${size}`

  return (
    <div
      className={containerClass}
      onClick={onClick}
    >
      {/* <div className="button-icon" /> */}
      <div className="col px-1 button-text">{text}</div>
      {/* <div className="buttosn-icon" /> */}
    </div>
  )
}

Button.defaultProps = defaultProps

export default Button