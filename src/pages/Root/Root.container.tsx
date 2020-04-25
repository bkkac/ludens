import React, { SFC, useState } from 'react'
import { isEqual } from 'lodash'
import { Navbar, TextRunning } from 'components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import routes from 'configs/routes'
import { THEME_MODE } from 'constants/variables'
import { ThemeContext } from 'configs/context'

const constants = {
  textRunning: 'ยินดีต้อนรับสู่ to ThailandBet',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRootProps = {}

const RootContainer: SFC<IRootProps & DefaultProps> = (props) => {

  const [themeMode, setThemeMode] = useState(THEME_MODE.DARK)

  const changeMode = (mode: string) => {
    setThemeMode(mode)
  }

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

  const RenderNavbar = () => (
    <ThemeContext.Consumer>
      {({ mode }) => <Navbar mode={mode} />}
    </ThemeContext.Consumer>
  )

  return (
    <ThemeContext.Provider value={{ mode: themeMode, changeMode }}>
      <Router>
        <RenderNavbar />
        <TextRunning text={constants.textRunning} />
        <PageElement />
      </Router>
    </ThemeContext.Provider>
  )

}

RootContainer.defaultProps = defaultProps

export default RootContainer