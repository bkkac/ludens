import React, { Component } from 'react'
import { noop } from 'lodash'
import { Formik, FormikProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { LoginForm, LottoList } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
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
    // console.log(values)
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
      <div className="container">
        <div className="login-container">
          <RenderLoginFormComponent />
        </div>
        <div className="mt-5 mb-4">
          <RenderLottoListComponent />
        </div>
      </div>
    )
  }
}

export default HomeContainer