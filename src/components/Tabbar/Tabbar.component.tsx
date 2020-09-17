import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { noop, includes } from 'lodash'
import './tabbar.style.scss'

const defaultProps: ITabbarProps = {
  tabs: [],
  mode: 'dark-mode',
}

const TabbarComponent: FC<ITabbarProps> = ({
  tabs,
  mode,
}) => {

  const history = useHistory()
  const location = useLocation()

  const onClickMenu = (path: string) => {
    history.push(path)
  }

  const MenuItems = () => {
    const Items = tabs!.map(({
      title,
      name,
      path,
      disabled,
      ActiveIcon,
      InactiveIcon,
    }, itemIndex) => {

      const isActive = includes(location.pathname, path)
      return (
        <div
          className="flex d-flex p0"
          key={`tab-${itemIndex}-${name}`}
          id={`tab-${itemIndex}-${name}`}
        >
          <div
            className={`menu-item border-rounded flex d-flex flex-column align-items-center justify-content-center ${disabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`}
            onClick={() => disabled ? noop() : onClickMenu(path)}
          >
            {isActive ? ActiveIcon : InactiveIcon}
            <h6 className="subtitle-2 m0-t">{title}</h6>
          </div>
        </div>
      )
    })
    return <>{Items}</>
  }

  return (
    <div className={`tabbar-container ${mode}`}>
      <div className="container d-flex flex-row h-100">
        <MenuItems />
      </div>
    </div>
  )
}

TabbarComponent.defaultProps = defaultProps

export default TabbarComponent