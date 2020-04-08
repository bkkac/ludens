import React, { SFC } from 'react'
import { noop } from 'lodash'
import './aLink.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IALink = {
  text: '',
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
  } = props

  const wrapperClass = bold ? 'alink-wrapper-bold' : 'alink-wrapper'
  const style = {
    color,
  }
  return (
    <span onClick={onClick} className={wrapperClass} style={style}>{text}</span>
  )
}

ALink.defaultProps = defaultProps

export default ALink