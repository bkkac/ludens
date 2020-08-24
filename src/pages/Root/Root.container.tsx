import React, { Component } from 'react'
import { isEqual, isEmpty, noop } from 'lodash'
import {
  Modal,
  Drawer,
  Navbar,
  Tabbar,
  TextRunning,
  AlertNotification,
} from 'components'
import {
  BrowserRouter as Router,
  RouteComponentProps,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'
import routers from 'constants/routes'
import routes from 'configs/routes'
import { Loader } from '../Loader'
import { LudensContext } from 'configs/context'
import { ReactComponent as HomeIcon } from 'assets/images/global/menu/home.svg'
import { ReactComponent as LotteryIcon } from 'assets/images/global/menu/lottery.svg'
import { ReactComponent as ChipIcon } from 'assets/images/global/menu/chip.svg'
import { ReactComponent as SlotIcon } from 'assets/images/global/menu/slot.svg'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRootProps & IRootActionProps = {
  wallet: { money: 0 },
  accessToken: '',
  textRunning: '',
  loader() { noop() },
  logout() { noop() },
  getMeConfig() { noop() },
  connectSocket() { noop() },
}

const Menus: ITabItem[] = [
  {
    title: 'หน้าหลัก',
    name: 'main',
    path: routers.main.path,
    Icon: (<HomeIcon className="tab-menu-icon m0-b" />),
  },
  {
    title: 'แทงหวย',
    name: 'lotto',
    path: routers.lotto.path,
    Icon: (<LotteryIcon className="tab-menu-icon m0-b" />),
  },
  {
    title: 'คาสิโน',
    name: 'cosino',
    disabled: true,
    path: '',
    Icon: (<ChipIcon className="tab-menu-icon m0-b" />),
  },
  {
    title: 'เกมส์',
    name: 'game',
    disabled: true,
    path: '',
    Icon: (<SlotIcon className="tab-menu-icon m0-b" />),
  },
]

class RootContainer extends Component<IRootProps & IRootActionProps & DefaultProps, IRootStates> {

  static defaultProps = defaultProps

  state: IRootStates = {
    themeMode: 'dark-mode',
    isShownWallet: true,
    isOpenDrawer: false,
  }

  componentDidMount() {
    this.props.getMeConfig()
    if (!isEmpty(this.props.accessToken)) {
      this.props.connectSocket()
    }
  }

  changeThemeMode = (mode: TThemeMode) => this.setState({
    themeMode: mode,
  })

  changeShowWallet = (shown: boolean) => this.setState({
    isShownWallet: shown,
  })

  handleOnClickBurgerMenu = () => {
    this.setState({ isOpenDrawer: !this.state.isOpenDrawer })
  }

  handleOnCloseDrawer = () => {
    this.setState({ isOpenDrawer: false })
  }

  handleOnLogout = () => {
    this.handleOnCloseDrawer()
    this.props.logout!()
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
          onPressesMenu={this.handleOnClickBurgerMenu}
          isAuthorized={!isEmpty(this.props.accessToken)}
        />
      )}
    </LudensContext.Consumer>
  )

  renderTabbar = () => {
    if (!isEmpty(this.props.accessToken)) {
      return (
        <LudensContext.Consumer>
          {({ theme }) => (
            <Tabbar mode={theme.mode} tabs={Menus} />
          )}
        </LudensContext.Consumer>
      )
    }
    return <></>
  }

  renderDrawer = () => {
    if (!isEmpty(this.props.accessToken)) {
      return (
        <LudensContext.Consumer>
          {({ theme }) => (
            <Drawer
              mode={theme.mode}
              isOpen={this.state.isOpenDrawer}
              onPressLogout={this.handleOnLogout}
              onCloseDrawer={this.handleOnCloseDrawer}
              onPressBackground={this.handleOnClickBurgerMenu}
            />
          )}
        </LudensContext.Consumer>
      )
    }
    return <></>
  }

  render() {
    const PageElement = this.renderPageElement
    const PageNavbar = this.renderNavbar
    const PageTabbar = this.renderTabbar
    const PageDrawer = this.renderDrawer

    const contextProviderValues = {
      theme: { mode: this.state.themeMode, changeMode: this.changeThemeMode },
      wallet: { shown: this.state.isShownWallet, changeShown: this.changeShowWallet },
    }

    return (
      <LudensContext.Provider value={contextProviderValues}>
        <Router>
          <TextRunning text={this.props.textRunning} />
          <PageNavbar />
          <PageElement />
          <PageTabbar />
          <PageDrawer />
        </Router>
        <AlertNotification.Core />
        <Modal.Core event="MODAL" />
        <Modal.Core event="MODAL_OVER" />
        <Loader />
      </LudensContext.Provider>
    )

  }
}

export default RootContainer