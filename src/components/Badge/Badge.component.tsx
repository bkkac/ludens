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
    renderText,
    backgroundColor,
  } = props

  const style = {
    color,
    backgroundColor,
  }

  const textRender = (): JSX.Element | string => {
    if (typeof renderText === 'function') {
      return renderText()
    }
    return text
  }

  return (
    <div className="badge-container" style={style}><h6>{textRender()}</h6></div>
  )
}

Badge.defaultProps = defaultProps

export default Badge