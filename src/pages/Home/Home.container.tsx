import React, { Component } from 'react'
import { noop } from 'lodash'
import { Formik, FormikProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { LoginForm, LottoList } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import ThailandIcon from 'assets/images/flags/thailand.png'
import './home.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IHomeProps & IHomeActionProps = {
  getLottoList() { noop() },
  lottoList: [],
  getLottoCode: 0,
  getLottoError: '',
  getLottoIsFetching: false,
}

class HomeContainer extends Component<IHomeProps & IHomeActionProps & DefaultProps & RouteComponentProps, {}> {

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.getLottoList()
  }

  onSubmitLogin = (values: ILogin) => {
    console.log(values)
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
        <div className="my-3">
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