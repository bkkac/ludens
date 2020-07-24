import React, { SFC, useState } from 'react'
import { noop } from 'lodash'
import './collapse.style.scss'

declare interface CollapseProps {
  expanded?: boolean
  maxExpandHeight?: number
  minCollapsedHeight?: number
  onStateChanged?(state: boolean): void
  RenderHeaderComponent(): JSX.Element
  RenderBodyComponent(): JSX.Element
}

const defaultProps: CollapseProps = {
  expanded: false,
  maxExpandHeight: 400,
  minCollapsedHeight: 0,
  onStateChanged() { noop() },
  RenderHeaderComponent() { return <></> },
  RenderBodyComponent() { return <></> },
}

const Collapse: SFC<CollapseProps> = ({
  expanded,
  maxExpandHeight,
  minCollapsedHeight,
  onStateChanged,
  RenderBodyComponent,
  RenderHeaderComponent,
}) => {

  const [isExpand, setExpand] = useState<boolean>(expanded!)

  const handleOnClickHeader = () => {
    const state = !isExpand
    setExpand(state)
    onStateChanged!(state)
  }

  return (
    <div onClick={handleOnClickHeader}>
      <RenderHeaderComponent />
      <div className="collapse-wrapper" style={{ maxHeight: isExpand ? maxExpandHeight : minCollapsedHeight }}>
        <RenderBodyComponent />
      </div>
    </div>
  )
}

Collapse.defaultProps = defaultProps

export default Collapse