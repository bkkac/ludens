import React, { SFC } from 'react'
import colors from 'constants/colors'
import './badge.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IBadge = {
  text: '',
  color: colors.SECONDARY_TEXT,
  backgroundColor: colors.SECONDARY_BG,
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
    <div className="badge-container" style={style}><h6>{text}</h6></div>
  )
}

Badge.defaultProps = defaultProps

export default Badge