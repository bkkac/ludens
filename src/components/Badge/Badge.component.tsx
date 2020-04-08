import React, { SFC } from 'react'
import './badge.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IBadge = {
  text: '',
  color: '#ffffff',
  backgroundColor: '#66c6b9',
}

const Badge: SFC<IBadge & DefaultProps> = (props) => {

  const {
    text,
    color,
    backgroundColor,
  } = props

  const style = {
    color,
    backgroundColor,
  }

  return (
    <span className="badge-container" style={style}>{text}</span>
  )
}

Badge.defaultProps = defaultProps

export default Badge