import React, { Component } from 'react'
import { isEqual, isEmpty, noop } from 'lodash'
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
import event from 'constants/event'

const constants = {
  textRunning: 'ยินดีต้อนรับสู่ ThailandBet เว็บแทงหวยออนไลน์ ที่ดีที่สุด เดิมพันง่าย จ่ายเงินจริง เล่นได้ทุกที่ทุกเวลา หากต้องสร้างรายได้กับการเดิมพัน โปรดีที่สุด จ่ายชัว 100%',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRootProps & IRootActionProps = {
  wallet: { money: 0 },
  accessToken: '',
  loader() { noop() },
  logout() { noop() },
  connectSocket() { noop() },
}

class RootContainer extends Component<IRootProps & IRootActionProps & DefaultProps, IRootStates> {

  static defaultProps = defaultProps

  state: IRootStates = {
    themeMode: THEME_MODE.DARKER,
    isShownWallet: true,
  }

  componentDidMount() {
    this.props.loader(false)
    if (!isEmpty(this.props.accessToken)) {
      this.props.connectSocket()
    }
  }

  changeThemeMode = (mode: string) => this.setState({
    themeMode: mode,
  })

  changeShowWallet = (shown: boolean) => this.setState({
    isShownWallet: shown,
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

  renderRedirectRoute = ({ component: RouteComponent, name, path, exact }: IRoutes) => {
    const renderRoute = (routeProps: RouteComponentProps) => {
      if (!isEmpty(this.props.accessToken)) {
        return (<Redirect to={{ pathname: '/main', state: { from: routeProps.location } }} />)
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
            : this.renderRedirectRoute(route))}
    </Switch>
  )

  renderNavbar = () => (
    <LudensContext.Consumer>
      {({ theme, wallet }) => (
        <Navbar
          mode={theme.mode}
          isDisplayWallet={wallet.shown}
          wallet={this.props.wallet}
          onPressesLogo={this.onPressLogo}
          onPressesMenu={this.props.logout}
          isAuthorized={!isEmpty(this.props.accessToken)}
        />
      )}
    </LudensContext.Consumer>
  )

  render() {
    const PageElement = this.renderPageElement
    const PageNavbar = this.renderNavbar

    const contextProviderValues = {
      theme: { mode: this.state.themeMode, changeMode: this.changeThemeMode },
      wallet: { shown: this.state.isShownWallet, changeShown: this.changeShowWallet },
    }

    return (
      <LudensContext.Provider value={contextProviderValues}>
        <Router>
          <TextRunning text={constants.textRunning} />
          <PageNavbar />
          <PageElement />
        </Router>
        <Modal.Core event={event.MODAL} />
        <Modal.Core event={event.MODAL_OVER} />
        <Loader />
      </LudensContext.Provider>
    )

  }
}

export default RootContainer