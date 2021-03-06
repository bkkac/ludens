import React, { Component, createRef, RefObject } from 'react'
import { noop, trim } from 'lodash'
import { Formik, FormikProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import response from 'constants/response'
import { Modal, ButtonIcon } from 'components'
import { LoginForm, LottoList } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import LogoThailandBet from 'assets/images/logo/logothailandbet.png'
import './home.style.scss'
import routes from 'constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

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
    const loginObject: ILogin = {
      username: trim(values.username),
      password: trim(values.password),
      remember: values.remember,
    }
    this.props.login(loginObject)
  }

  onNavigateToRegister = () => {
    this.props.history.push(routes.register.path)
  }

  onNavigateToForgotPassword = () => {
    this.props.history.push(routes.forgotPassword.path)
  }

  handleScrollToTop = () => {
    if(this.homeContainerRef.current){
      this.homeContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
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
              <img alt="thailand bet logo" src={LogoThailandBet} className="login-logo m3-b" />
              {/* <h3>Thailand<span>BET</span></h3> */}
            </div>
            <RenderLoginFormComponent />
          </div>
        </div>
        <div className="pb-4 primary-bg">
          <div className="container">
            <RenderLottoListComponent />
          </div>
        </div>
        <div className="scroll-to-top-wrapper">
          <ButtonIcon
            onClick={this.handleScrollToTop}
            CustomIcon={<FontAwesomeIcon icon={faArrowUp} className="primary-text" />}
            type="custom"
            id="scroll-to-top"
          />
        </div>
      </div>
    )
  }
}

export default HomeContainer