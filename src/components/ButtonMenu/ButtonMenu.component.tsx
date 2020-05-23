import React, { SFC } from 'react'
import { noop } from 'lodash'
import { ResponsiveIcon } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import './buttonMenu.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButtonMenu = {
  icon: '',
  text: '',
  onClick() { noop() },
}

const ButtonMenu: SFC<IButtonMenu & DefaultProps> = ({
  icon,
  text,
  onClick,
}) => {

  return (
    <div className="col button-menu-container" onClick={onClick}>
      <div className="d-flex flex-row">
        <ResponsiveIcon icon={icon!} className="icon-button-menu" alt="button-menu" />
        <div className="chevron-icon-container">
          <FontAwesomeIcon icon={faChevronCircleRight} className="chevron-icon-button" />
        </div>
      </div>
      <div className="title-text-button">{text}</div>
    </div>
  )
}

ButtonMenu.defaultProps = defaultProps

export default ButtonMenu