import React, { SFC } from 'react'
import { noop } from 'lodash'
import { ResponsiveIcon } from 'components'
import './buttonMenu.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButtonMenu = {
  icon: '',
  text: '',
  onClick: undefined,
}

const ButtonMenu: SFC<IButtonMenu & DefaultProps> = ({
  icon,
  text,
  onClick,
}) => {


  const onClickHandler = (typeof onClick === 'undefined') ? noop : onClick

  const disabledClass = (typeof onClick === 'undefined') ? 'disabled' : ''

  return (
    <div className={`d-flex flex flex-column justify-content-center align-items-center button-menu-container ${disabledClass}`} onClick={onClickHandler}>
      <div className="icon-wrapper d-flex align-items-end">
        <ResponsiveIcon icon={icon!} className="icon-button-menu" alt="button-menu" />
      </div>
      <div className="flex d-flex align-items-center">
        <h4 className="title-text-button">
          {text}
        </h4>
      </div>
    </div>
  )
}

ButtonMenu.defaultProps = defaultProps

export default ButtonMenu