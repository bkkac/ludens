import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import './buttonMenu.style.scss'

const ButtonMenu: SFC<IButtonMenu> = ({
  icon,
  text,
}) => {

  return (
    <div className="col button-menu-container">
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

export default ButtonMenu