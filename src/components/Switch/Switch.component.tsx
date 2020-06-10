import React, { SFC, useState, useEffect } from 'react'
import { noop, isEqual } from 'lodash'
import './switch.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ISwitchProps = {
  type: 'fill',
  tabs: [],
  defaultValue: '',
  handleOnChangeTab() { noop() },
}

const Switch: SFC<ISwitchProps & DefaultProps> = ({
  handleOnChangeTab,
  defaultValue,
  tabs,
  type,
}) => {

  const [activeSwitch, setActive] = useState(defaultValue)

  useEffect(() => {
    if (defaultValue) {
      setActive(defaultValue)
    } else if (tabs.length > 0) {
      setActive(tabs[0].value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeTab = (value: string) => {
    setActive(value)
    handleOnChangeTab!(value)
  }

  const RenderSwitchItem = () => {
    const ItemsComponent = tabs.map((item, index) => {
      const activeClass = isEqual(item.value, activeSwitch) ? 'active' : ''
      return (
        <div
          className={`col mx-2 mx-sm-3 mx-md-5 my-auto switch-item-wrapper ${activeClass}`}
          key={`switch-${index}-${item.value}`}
          onClick={() => onChangeTab(item.value)}
        >
          {item.label}
        </div>
      )
    })
    return (
      <div className={`row switch-container ${type}`}>
        {ItemsComponent}
      </div>
    )
  }

  return (<RenderSwitchItem />)
}

Switch.defaultProps = defaultProps

export default Switch