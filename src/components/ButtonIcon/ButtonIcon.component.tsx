import React, { SFC } from 'react'
import { noop } from 'lodash'
import './buttonIcon.style.scss'

import { ReactComponent as CloseIcon } from 'assets/images/global/close/close.svg'

const iconSet: { [typed in IButtonIconType]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  close: CloseIcon,
  custom: () => <></>,
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IButtonIcon = {
  id: '',
  type: 'close',
  onClick() { noop() },
}

const ButtonIcon: SFC<IButtonIcon & DefaultProps> = ({
  id,
  type,
  onClick,
  CustomIcon,
}) => {

  const Icon = (): JSX.Element => {
    switch (type) {
      case 'custom':
        if (typeof CustomIcon === 'undefined') { return <></> }
        return CustomIcon
      default:
        const IconComponent = iconSet[type]
        return <IconComponent className="icon-button" />
    }
  }

  return (
    <div className="icon-button-container" onClick={onClick} id={id}>
      <Icon />
    </div>
  )
}

ButtonIcon.defaultProps = defaultProps

export default ButtonIcon