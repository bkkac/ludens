import React, { SFC } from 'react'
import { noop } from 'lodash'
import './aLink.style.scss'
import colors from 'constants/colors'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IALink = {
  fontSize: 16,
  bold: false,
  color: '#777777',
  disabled: false,
  underline: false,
  onClick() { noop() },
}

const ALink: SFC<IALink & DefaultProps> = (props) => {

  const {
    bold,
    color,
    onClick,
    disabled,
    fontSize,
    underline,
    children,
  } = props

  const disabledClass = disabled ? 'disabled' : ''
  const underlineClass = underline ? 'underline' : ''
  const wrapperClass = bold ? `button-link-text-bold ${disabledClass} ${underlineClass}` : `button-link-text ${disabledClass} ${underlineClass}`
  const style = {
    color: disabled ? colors.SECONDARY_TEXT : color,
    fontSize,
  }

  const handleOnClick = () => disabled ? noop() : onClick!()

  return (<span onClick={handleOnClick} className={wrapperClass} style={style}>{children}</span>)
}

ALink.defaultProps = defaultProps

export default ALink