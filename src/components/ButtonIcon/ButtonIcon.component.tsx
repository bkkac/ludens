import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import { noop } from 'lodash'
import './buttonIcon.style.scss'

import CloseIcon from 'assets/images/global/close/close.png'
import CloseIcon2x from 'assets/images/global/close/close@2x.png'
import CloseIcon3x from 'assets/images/global/close/close@3x.png'

const iconSet: { [typed in IButtonIconType]: string | IIconSet } = {
  close: { x1: CloseIcon, x2: CloseIcon2x, x3: CloseIcon3x },
  custom: '',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButtonIcon = {
  type: 'close',
  onClick() { noop() },
}

const ButtonIcon: SFC<IButtonIcon & DefaultProps> = ({
  type,
  onClick,
  customIcon,
}) => {

  const icon = (): string | IIconSet => {
    switch (type) {
      case 'custom':
        return customIcon!
      default:
        return iconSet[type]
    }
  }

  return (
    <div className="icon-button-container" onClick={onClick}>
      <ResponsiveIcon icon={icon()} className="icon-button" alt="icon-button-alt" />
    </div>
  )
}

ButtonIcon.defaultProps = defaultProps

export default ButtonIcon