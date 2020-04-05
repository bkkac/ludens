import React, { createElement } from 'react'
import { upperFirst, camelCase, get } from 'lodash'
import { useRouteNode } from 'react-router5'
import { Navbar } from 'components'
import Pages from 'pages'

function RootContainer(props: IRootProps) {
  const { route } = useRouteNode('')
  const topRouteName = route.name.split('.')[0]
  const converseCase = upperFirst(camelCase(topRouteName))

  const PageElement = () => createElement(get(Pages, converseCase, (<div>Not found</div>)))

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm">
            One of three columns
    </div>
          <div className="col-sm">
            One of three columns
    </div>
          <div className="col-sm">
            <PageElement />
          </div>
        </div>
      </div>
    </div>
  )

}

export default RootContainer