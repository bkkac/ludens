import React, { Component } from 'react'
import { noop } from 'lodash'
import { Formik, FormikValues, FormikProps } from 'formik'
import { LoginForm, LottoList } from './components'
import './home.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IHomeProps & IHomeActionProps = {
  getLottoList() { noop() },
  lottoList: [],
  getLottoCode: 0,
  getLottoError: '',
  getLottoIsFetching: false,
}

class HomeContainer extends Component<IHomeProps & IHomeActionProps & DefaultProps, {}> {

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.getLottoList()
  }

  onSubmitLogin = (values: FormikValues) => {
    // console.log(values)
  }

  renderLoginForm = () => {
    const LoginFormComponent = (formProps: FormikProps<FormikValues>) => {
      return <LoginForm {...formProps} />
    }
    return (
      <Formik
        initialValues={{}}
        validationSchema={{}}
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