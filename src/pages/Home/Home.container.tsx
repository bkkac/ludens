import React, { Component } from 'react'
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

  componentDidMount() {
    this.props.getLottoList()
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
      <>
        <div className="login-container">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <img alt="thailand bet logo" src={ThailandIcon} className="login-logo" />
              <div className="login-app-name">THAILAND<span>BET</span></div>
            </div>
            <RenderLoginFormComponent />
          </div>
        </div>
        <div className="my-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="ad-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <RenderLottoListComponent />
        </div>
      </>
    )
  }
}

export default HomeContainer