import React, { Component, createRef, RefObject } from 'react'
import { noop } from 'lodash'
import { Formik, FormikProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import response from 'constants/response'
import { Modal } from 'components'
import { LoginForm, LottoList } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import ThailandIcon from 'assets/images/flags/thailand.png'
import './home.style.scss'

const constants = {
  ok: 'ตกลง',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IHomeProps & IHomeActionProps = {
  getLottoList() { noop() },
  lottoList: [],
  getLottoCode: 0,
  getLottoError: '',
  getLottoIsFetching: false,
  login() { noop() },
  loginResult: [],
  loginCode: 0,
  loginError: '',
  loginIsFetching: false,
  loader() { noop() },
}

class HomeContainer extends Component<IHomeProps & IHomeActionProps & DefaultProps & RouteComponentProps, {}> {

  static defaultProps = defaultProps
  homeContainerRef: RefObject<HTMLDivElement> = createRef()

  componentDidMount() {
    this.props.getLottoList()
    if (this.homeContainerRef.current) {
      this.homeContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
  }

  componentDidUpdate(prevProps: IHomeProps) {
    if (prevProps.loginIsFetching !== this.props.loginIsFetching && !this.props.loginIsFetching) {
      this.props.loader(false)
      if (this.props.loginCode === response.OK) {
        this.props.history.replace('/main')
      } else {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.loginError,
          actionText: constants.ok,
        })
      }
    }
  }

  onSubmitLogin = (values: ILogin) => {
    this.props.loader(true)
    this.props.login(values)
  }

  onNavigateToRegister = () => {
    this.props.history.push('/register')
  }

  onNavigateToForgotPassword = () => {
    // this.props.history.replace('/register')
  }

  renderLoginForm = () => {
    const LoginFormComponent = (formProps: FormikProps<ILogin>) => {
      return (
        <LoginForm
          onNavigateToRegister={this.onNavigateToRegister}
          onNavigateToForgotPassword={this.onNavigateToForgotPassword}
          {...formProps}
        />
      )
    }
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitLogin}
      >
        {LoginFormComponent}
      </Formik>
    )
  }


  renderLottoList = () => {
    return <LottoList data={this.props.lottoList} />
  }

  render() {
    const RenderLoginFormComponent = this.renderLoginForm
    const RenderLottoListComponent = this.renderLottoList
    return (
      <div className="home-container primary-bg" ref={this.homeContainerRef}>
        <div className="login-container primary-bg">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center m3-b">
              <img alt="thailand bet logo" src={ThailandIcon} className="login-logo" />
              <h3>Thailand<span>BET</span></h3>
            </div>
            <RenderLoginFormComponent />
          </div>
        </div>
        <img alt="banner" src="https://3.bp.blogspot.com/-gLYDJEWOLgI/XoaKoqR6PyI/AAAAAAAACcI/6ki30_y8rFIIUbERmxdP9iPA3vNk-ANTgCLcBGAsYHQ/s1600/3.gif" className="ad-image" />
        <img alt="banner" src="https://4.bp.blogspot.com/-u7vnBFj6HwA/XwSPXMu8VHI/AAAAAAAACno/gYCuwaK9dNMI8KA3_q54BTqGIhR9vx68QCLcBGAsYHQ/s1600/1.gif" className="ad-image" />
        <div className="pb-4 primary-bg">
          <div className="container">
            <RenderLottoListComponent />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeContainer