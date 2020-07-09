import React, { SFC } from 'react'
import { noop } from 'lodash'
import './aLink.style.scss'
import colors from 'constants/colors'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IALink = {
  fontSize: 14,
  bold: false,
  color: '#777777',
  disabled: false,
  onClick() { noop() },
}

const ALink: SFC<IALink & DefaultProps> = (props) => {

  const {
    bold,
    color,
    onClick,
    disabled,
    fontSize,
    children,
  } = props

  const disabledClass = disabled ? 'disabled' : ''
  const wrapperClass = bold ? `button-link-text-bold ${disabledClass}` : `button-link-text ${disabledClass}`
  const style = {
    color: disabled ? colors.SECONDARY_TEXT : color,
    fontSize,
  }

  const handleOnClick = () => disabled ? noop() : onClick!()

  return (<span onClick={handleOnClick} className={wrapperClass} style={style}>{children}</span>)
}

ALink.defaultProps = defaultProps

export default ALink