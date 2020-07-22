import React, { SFC } from 'react'
import { noop } from 'lodash'
import './aLink.style.scss'
import colors from 'constants/colors'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IALink = {
  id: '',
  fontSize: 16,
  bold: false,
  color: colors.SECONDARY_TEXT,
  disabled: false,
  underline: false,
  onClick() { noop() },
}

const ALink: SFC<IALink & DefaultProps> = (props) => {

  const {
    id,
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

  return (<span id={id} onClick={handleOnClick} className={wrapperClass} style={style}>{children}</span>)
}

ALink.defaultProps = defaultProps

export default ALink