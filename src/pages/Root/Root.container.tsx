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
    <>
      <Navbar />
      <PageElement />
    </>
  )

}

export default RootContainer