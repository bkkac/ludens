import React, { SFC } from 'react'
import { noop } from 'lodash'
import './aLink.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IALink = {
  text: '',
  fontSize: 14,
  bold: false,
  color: '#777777',
  onClick() { noop() },
}

const ALink: SFC<IALink & DefaultProps> = (props) => {

  const {
    text,
    bold,
    color,
    onClick,
    fontSize,
  } = props

  const wrapperClass = bold ? 'alink-wrapper-bold' : 'alink-wrapper'
  const style = {
    color,
    fontSize,
  }
  return (
    <span onClick={onClick} className={wrapperClass} style={style}>{text}</span>
  )
}

ALink.defaultProps = defaultProps

export default ALink