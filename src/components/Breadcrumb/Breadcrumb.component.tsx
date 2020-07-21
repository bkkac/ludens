import React, { SFC, Fragment } from 'react'
import { noop } from 'lodash'
import { ALink } from 'components'
import './breadcrumb.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IBreadcrumbProps = {
  items: [],
  handleOnClickItem() { noop() },
}

const Breadcrumb: SFC<IBreadcrumbProps & DefaultProps> = (props) => {

  const RenderBreadcrumbItems = () => {
    const ItemsComponent = props.items.map((item, index) => {
      return (
        <Fragment key={`${item.path}-${index}`}>
          <ALink
            id={`breadcrumb-${index}`}
            bold
            color={item.active ? '#777777' : '#74605c'}
            fontSize={20}
            disabled={item.active}
            key={`${item.label}-${index}`}
            onClick={() => props.handleOnClickItem!(item.path)}
          >
            {item.label}
          </ALink>
          <span className="breadcrumb-slash">{item.active ? '' : ' / '}</span>
        </ Fragment>
      )
    })

    return (<div className="breadcrumb-wrapper">{ItemsComponent}</div>)
  }

  return (
    <div className="breadcrumb-container">
      <RenderBreadcrumbItems />
    </div>
  )
}

export default Breadcrumb