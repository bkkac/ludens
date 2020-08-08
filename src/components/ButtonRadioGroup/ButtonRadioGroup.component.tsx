import React, { SFC, useState, useEffect } from 'react'
import { map, noop, get } from 'lodash'
import './buttonRadioGroup.style.scss'

const defaultProps: IButtonRadioGroup = {
  id: '',
  dataset: [],
  onChange() { noop() },
}

const ButtonRadioGroupComponent: SFC<IButtonRadioGroup> = ({
  id,
  dataset,
  onChange,
  forceSelectedData,
}) => {

  const [selectedItem, setSelectedItem] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<boolean[]>([])

  useEffect(() => {
    if (typeof forceSelectedData !== 'undefined') {
      setSelectedIndex(forceSelectedData)
    }
  }, [forceSelectedData])

  const onClickButton = (item: any, index: number, state: boolean) => {
    const selectedItemBefore = selectedIndex
    selectedItemBefore[index] = state
    setSelectedIndex(selectedItemBefore)

    const removedItem = selectedItem.filter((selectItem) => selectItem !== item)
    if (state) {
      const newSelectedItem = [...removedItem, item]
      setSelectedItem(newSelectedItem)
      onChange!(selectedItemBefore, item, state)
    } else {
      setSelectedItem(removedItem)
      onChange!(selectedItemBefore, item, state)
    }
  }

  const ButtonsComponent = map(dataset, (item, itemIndex) => {
    const isActive = get(selectedIndex, itemIndex, false)
    return (
      <div
        className={`button-radio-group-wrapper flex ${isActive ? 'active' : ''}`}
        onClick={() => onClickButton(item, itemIndex, !isActive)}
        id={`button-group-component-${id}-${itemIndex}`}
        key={`button-group-component-${id}-${itemIndex}`}
      >
        <h3>{item}</h3>
      </div>
    )
  })

  return (
    <div className="button-radio-group-container">
      {ButtonsComponent}
    </div>
  )
}

ButtonRadioGroupComponent.defaultProps = defaultProps

export default ButtonRadioGroupComponent