import React, { Component } from 'react'
import { Formik, FormikValues, FormikProps } from 'formik'
import { LoginForm, LottoList } from './components'
import './home.style.scss'

class HomeContainer extends Component {


  onSubmitLogin = (values: FormikValues) => {
    console.log(values)
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

    return <LottoList />
  }

  render() {
    const RenderLoginFormComponent = this.renderLoginForm
    const RenderLottoListComponent = this.renderLottoList
    return (
      <div className="container">
        <div className="login-container">
          <RenderLoginFormComponent />
        </div>
        <div className="my-5">
          <RenderLottoListComponent />
        </div>
      </div>
    )
  }
}

export default HomeContainer