import React, { SFC } from 'react'
import { isEmpty } from 'lodash'
import './banner.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IBanner = {
  ImageIcon: '',
}

const Banner: SFC<IBanner & DefaultProps> = (props) => {

  const { ImageIcon } = props

  if (isEmpty(ImageIcon)) {
    return <div className="col banner-container empty" />
  }

  return <img src={ImageIcon} className="col banner-container" alt="banner" />
}

Banner.defaultProps = defaultProps

export default Banner