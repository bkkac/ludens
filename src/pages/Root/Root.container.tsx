import React from 'react'
import { isEqual } from 'lodash'
import { Navbar, TextRunning } from 'components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import routes from 'configs/routes'

function RootContainer(props: IRootProps) {

  const PageElement = () => (
    <Switch>
      {routes.map(route =>
        isEqual(route.name, '404')
          ? (<Route key={`${route.name}-page`} component={route.component} />)
          : (
            <Route
              component={route.component}
              key={`${route.name}-page`}
              exact={route.exact}
              path={route.path}
            />
          ))}
    </Switch>
  )

  return (
    <Router>
      <Navbar />
      <TextRunning text="Welcome to ThailandBet" />
      <PageElement />
    </Router>
  )

}

export default RootContainer