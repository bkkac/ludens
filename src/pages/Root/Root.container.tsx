import React, { Component } from 'react'
import { isEqual, isEmpty } from 'lodash'
import {
  Modal,
  Navbar,
  TextRunning,
} from 'components'
import {
  BrowserRouter as Router,
  RouteComponentProps,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import routes from 'configs/routes'
import { Loader } from '../Loader'
import { THEME_MODE } from 'constants/variables'
import { LudensContext } from 'configs/context'

const constants = {
  textRunning: 'ยินดีต้อนรับสู่ to ThailandBet',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRootProps = {
  accessToken: '',
}

class RootContainer extends Component<IRootProps & DefaultProps, IRootStates> {

  static defaultProps = defaultProps

  state: IRootStates = {
    themeMode: THEME_MODE.DARK,
  }

  changeThemeMode = (mode: string) => this.setState({
    themeMode: mode,
  })

  onPressLogo = () => {
    return <Link to="/main" />
  }

  renderGuardRoute = ({ component: RouteComponent, name, path, exact }: IRoutes) => {
    const renderRoute = (routeProps: RouteComponentProps) => {
      if (isEmpty(this.props.accessToken)) {
        return (<Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />)
      }
      return (<RouteComponent {...routeProps} />)
    }

    return (
      <Route
        key={`${name}-page`}
        exact={exact}
        path={path}
        render={renderRoute}
      />
    )
  }

  renderPageElement = () => (
    <Switch>
      {routes.map(route =>
        isEqual(route.name, '404')
          ? (<Route key={`${route.name}-page`} component={route.component} />)
          : (route.private)
            ? this.renderGuardRoute(route)
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

  renderNavbar = () => (
    <LudensContext.Consumer>
      {({ theme }) => <Navbar mode={theme.mode} onPressesLogo={this.onPressLogo} />}
    </LudensContext.Consumer>
  )

  render() {
    const PageElement = this.renderPageElement
    const PageNavbar = this.renderNavbar

    const contextProviderValues = {
      theme: { mode: this.state.themeMode, changeMode: this.changeThemeMode },
    }

    return (
      <LudensContext.Provider value={contextProviderValues}>
        <Router>
          <PageNavbar />
          <TextRunning text={constants.textRunning} />
          <PageElement />
        </Router>
        <Modal.Core />
        <Loader />
      </LudensContext.Provider>
    )

  }
}

export default RootContainer